
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

export interface ServerFormValues {
  name: string;
  hostname: string;
  ip: string;
  type: "server" | "database" | "web" | "dns";
  port?: string;
}

export interface AddServerFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddServer: (data: ServerFormValues) => Promise<void>;
  inline?: boolean;
}

const serverSchema = z.object({
  name: z.string().min(1, "Name wird benötigt"),
  hostname: z.string().min(1, "Hostname wird benötigt"),
  ip: z.string().min(1, "IP-Adresse wird benötigt"),
  type: z.enum(["server", "database", "web", "dns"], {
    required_error: "Bitte wähle einen Server-Typ",
  }),
  port: z.string().optional(),
});

export function AddServerForm({ open, onOpenChange, onAddServer, inline = false }: AddServerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof serverSchema>>({
    resolver: zodResolver(serverSchema),
    defaultValues: {
      name: "",
      hostname: "",
      ip: "",
      type: "server",
      port: "",
    },
  });

  async function onSubmit(data: z.infer<typeof serverSchema>) {
    try {
      setIsSubmitting(true);
      // Make sure all required fields are passed to onAddServer
      const formValues: ServerFormValues = {
        name: data.name,
        hostname: data.hostname,
        ip: data.ip,
        type: data.type,
        port: data.port
      };
      await onAddServer(formValues);
      form.reset(); // Formular zurücksetzen nach erfolgreicher Übermittlung
      onOpenChange(false);
      toast({
        title: "Server hinzugefügt",
        description: `${data.name} wurde erfolgreich zur Überwachung hinzugefügt.`,
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Der Server konnte nicht hinzugefügt werden. Bitte versuche es erneut.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const formContent = (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Mein Web-Server" {...field} className="glass border-white/10" />
              </FormControl>
              <FormDescription>Ein beschreibender Name für diesen Server</FormDescription>
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
                <Input placeholder="server.example.com" {...field} className="glass border-white/10" />
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
                <Input placeholder="192.168.1.1" {...field} className="glass border-white/10" />
              </FormControl>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server-Typ</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="glass border-white/10">
                    <SelectValue placeholder="Typ auswählen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="server">Server</SelectItem>
                  <SelectItem value="database">Datenbank</SelectItem>
                  <SelectItem value="web">Webserver</SelectItem>
                  <SelectItem value="dns">DNS-Server</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="port"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port (optional)</FormLabel>
              <FormControl>
                <Input placeholder="22, 80, 443, etc." {...field} className="glass border-white/10" />
              </FormControl>
              <FormDescription>Standard-Port für SSH: 22, HTTP: 80, HTTPS: 443</FormDescription>
            </FormItem>
          )}
        />
        
        <div className={inline ? "" : "mt-6"}>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="diekerit-gradient-bg hover:opacity-90 glow-button w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Wird hinzugefügt...
              </>
            ) : (
              "Server hinzufügen"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );

  if (inline) {
    return formContent;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-white/10 sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">Server hinzufügen</DialogTitle>
          <DialogDescription>
            Gib die Details deines Servers ein, um ihn zur Überwachung hinzuzufügen.
          </DialogDescription>
        </DialogHeader>
        
        {formContent}
      </DialogContent>
    </Dialog>
  );
}
