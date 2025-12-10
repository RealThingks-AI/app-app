import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Ticket } from "lucide-react";

const ModuleGrid = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20 px-4">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex justify-center">
          <Card 
            className="group relative overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 animate-fade-in hover:scale-105 w-full max-w-md"
          >
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-b from-cyan-500 to-blue-500 flex items-center justify-center">
              <span className="text-white font-semibold text-sm writing-mode-vertical">
                IT
              </span>
            </div>
            <div className="pl-16 pr-6 py-6">
              <Link
                to="/helpdesk"
                className="flex items-center gap-3 text-foreground hover:text-primary transition-colors group/item"
              >
                <Ticket className="w-5 h-5 text-muted-foreground group-hover/item:text-primary transition-colors" />
                <span className="text-sm font-medium group-hover/item:translate-x-1 transition-transform duration-200">
                  HelpDesk
                </span>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ModuleGrid;
