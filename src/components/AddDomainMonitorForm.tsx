
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export interface DomainMonitorFormValues {
  domain: string;
  recordTypes: string; // A,AAAA,MX,CNAME,TXT
}

export interface AddDomainMonitorFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddDomain: (data: DomainMonitorFormValues) => Promise<void>;
}

const domainSchema = z.object({
  domain: z.string().min(1, "Domain wird benötigt").regex(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/, "Ungültiges Domain-Format"),
  recordTypes: z.string().default("A,AAAA,MX,CNAME,TXT"),
});

export function AddDomainMonitorForm({ open, onOpenChange, onAddDomain }: AddDomainMonitorFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof domainSchema>>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domain: "",
      recordTypes: "A,AAAA,MX,CNAME,TXT",
    },
  });

  async function onSubmit(data: z.infer<typeof domainSchema>) {
    try {
      setIsSubmitting(true);
      // Make sure all required fields are passed to onAddDomain
      const formValues: DomainMonitorFormValues = {
        domain: data.domain,
        recordTypes: data.recordTypes
      };
      await onAddDomain(formValues);
      form.reset();
      onOpenChange(false);
      toast({
        title: "Domain hinzugefügt",
        description: `${data.domain} wird nun auf DNS-Änderungen überwacht.`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Die Domain konnte nicht hinzugefügt werden. Bitte versuche es erneut.",
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
          <DialogTitle className="text-lg font-medium">Domain überwachen</DialogTitle>
          <DialogDescription>
            Füge eine Domain hinzu, deren DNS-Einträge auf Änderungen überwacht werden sollen.
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="domain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Domain</FormLabel>
                  <FormControl>
                    <Input placeholder="example.com" {...field} className="glass border-white/10" />
                  </FormControl>
                  <FormDescription>Domainname ohne http:// oder www.</FormDescription>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="recordTypes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Zu überwachende Record-Typen</FormLabel>
                  <FormControl>
                    <Input placeholder="A,AAAA,MX,CNAME,TXT" {...field} className="glass border-white/10" />
                  </FormControl>
                  <FormDescription>Mit Komma getrennte Liste der DNS-Record-Typen</FormDescription>
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
                  "Domain hinzufügen"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
