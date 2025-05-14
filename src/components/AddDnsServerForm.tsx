
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export interface DnsServerFormValues {
  name: string;
  hostname: string;
  ip: string;
  provider?: string;
}

export interface AddDnsServerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDnsServer: (data: DnsServerFormValues) => Promise<void>;
}

const dnsServerSchema = z.object({
  name: z.string().min(1, "Name wird benötigt"),
  hostname: z.string().min(1, "Hostname wird benötigt"),
  ip: z.string().min(1, "IP-Adresse wird benötigt"),
  provider: z.string().optional(),
});

export function AddDnsServerForm({ open, onOpenChange, onAddDnsServer }: AddDnsServerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof dnsServerSchema>>({
    resolver: zodResolver(dnsServerSchema),
    defaultValues: {
      name: "",
      hostname: "",
      ip: "",
      provider: "",
    },
  });

  async function onSubmit(data: z.infer<typeof dnsServerSchema>) {
    try {
      setIsSubmitting(true);
      // Make sure all required fields are passed to onAddDnsServer
      const formValues: DnsServerFormValues = {
        name: data.name,
        hostname: data.hostname,
        ip: data.ip,
        provider: data.provider
      };
      await onAddDnsServer(formValues);
      form.reset();
      onOpenChange(false);
      toast({
        title: "DNS-Server hinzugefügt",
        description: `${data.name} wurde erfolgreich zur Überwachung hinzugefügt.`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Der DNS-Server konnte nicht hinzugefügt werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/10 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">DNS-Server hinzufügen</DialogTitle>
          <DialogDescription>
            Gib die Details deines DNS-Servers ein, um ihn zur Überwachung hinzuzufügen.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Primary DNS" {...field} className="glass border-white/10" />
                  </FormControl>
                  <FormDescription>Ein beschreibender Name für diesen DNS-Server</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="hostname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hostname</FormLabel>
                  <FormControl>
                    <Input placeholder="ns1.example.com" {...field} className="glass border-white/10" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP-Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="192.168.1.5" {...field} className="glass border-white/10" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="provider"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anbieter (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Cloudflare, Google, etc." {...field} className="glass border-white/10" />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <DialogFooter>
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="diekerit-gradient-bg hover:opacity-90 glow-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Wird hinzugefügt...
                  </>
                ) : (
                  "DNS-Server hinzufügen"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
