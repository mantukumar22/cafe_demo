import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useSubmitContact } from "@workspace/api-client-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2, MapPin, Phone, Mail, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export function Contact() {
  const submitContact = useSubmitContact();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    submitContact.mutate(
      { data: values },
      {
        onSuccess: () => {
          toast.success("Message sent successfully! We'll be in touch soon.");
          form.reset();
        },
        onError: () => {
          toast.error("Failed to send message. Please try again later.");
        },
      }
    );
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FDF6EC]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl text-[#1C0A00] mb-6"
          >
            Get in Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#C8963E] mx-auto"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="font-serif text-3xl text-[#1C0A00] mb-8">Visit Us</h3>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4 text-[#1C0A00]/80">
                <MapPin className="w-6 h-6 text-[#C8963E] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#1C0A00]">Location</h4>
                  <p>123 Coffee Lane, SoMa District<br/>San Francisco, CA 94103</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-[#1C0A00]/80">
                <Phone className="w-6 h-6 text-[#C8963E] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#1C0A00]">Phone</h4>
                  <p>+1 (415) 555-0198</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-[#1C0A00]/80">
                <Mail className="w-6 h-6 text-[#C8963E] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#1C0A00]">Email</h4>
                  <p>hello@brewedbliss.cafe</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4 text-[#1C0A00]/80">
                <Clock className="w-6 h-6 text-[#C8963E] flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-[#1C0A00]">Hours</h4>
                  <p>Mon–Fri: 7am–8pm<br/>Sat–Sun: 8am–9pm</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden border border-[#C8963E]/30 shadow-lg">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0!2d-122.403!3d37.787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ3JzEzLjIiTiAxMjLCsDI0JzExLjAiVw!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Brewed Bliss Location"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-[#C8963E]/10"
          >
            <h3 className="font-serif text-3xl text-[#1C0A00] mb-8">Send a Message</h3>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C0A00]">Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} className="border-[#1C0A00]/20 focus-visible:ring-[#C8963E]" data-testid="input-contact-name" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C0A00]">Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Your email address" {...field} className="border-[#1C0A00]/20 focus-visible:ring-[#C8963E]" data-testid="input-contact-email" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[#1C0A00]">Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="How can we help you?" 
                          className="min-h-[150px] border-[#1C0A00]/20 focus-visible:ring-[#C8963E]" 
                          {...field} 
                          data-testid="input-contact-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-[#1C0A00] text-[#C8963E] hover:bg-[#C8963E] hover:text-[#1C0A00] py-6 text-base tracking-widest uppercase transition-all duration-300"
                  disabled={submitContact.isPending}
                  data-testid="button-contact-submit"
                >
                  {submitContact.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
