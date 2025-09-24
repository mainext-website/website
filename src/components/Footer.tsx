import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@Mainext.com", label: "Email" },
  ];

  return (
    <footer className="bg-secondary/40 border-t border-primary/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Mainext Innovations
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Empowering Ideas. Engineering Innovation. Delivering Results.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-muted-foreground hover:text-primary transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Get In Touch</h3>
            <p className="text-muted-foreground mb-4">
              Ready to start your project?<br />
              <a href="mailto:mainextinnovations@gmail.com" className="text-primary hover:text-accent transition-colors">
                mainextinnovations@gmail.com
              </a>
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center hover:shadow-glow transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary/20 flex flex-col md:flex-row items-center justify-between text-muted-foreground">
          <p className="flex items-center gap-2">
            © {currentYear} Mainext Innovations. Made with
            <Heart className="w-4 h-4 text-red-500" />
            and cutting-edge technology.
          </p>
          <p className="mt-4 md:mt-0">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;