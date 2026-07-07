import React, { useEffect, useState } from 'react';
import { ShieldCheck, Sparkles, AlertCircle, Check, Smartphone, Landmark, Clock, ArrowRight } from 'lucide-react';

// Declare Hotmart checkout elements type for compiler safety
declare global {
  interface Window {
    checkoutElements?: {
      init: (type: string) => {
        mount: (selector: string) => void;
      };
    };
  }
}

export default function App() {
  const [countdown, setCountdown] = useState(599); // 9:59 timer
  const [refused, setRefused] = useState(false);

  // Hotmart Sales Funnel integration
  useEffect(() => {
    // Check if script already exists to avoid duplicate loads
    const existingScript = document.querySelector('script[src*="hotmart-checkout-elements.js"]');
    
    const initHotmart = () => {
      if (window.checkoutElements) {
        try {
          window.checkoutElements.init('salesFunnel').mount('#hotmart-sales-funnel');
        } catch (e) {
          console.error('Erro ao inicializar o funil Hotmart:', e);
        }
      }
    };

    if (!existingScript) {
      const script = document.createElement('script');
      script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
      script.async = true;
      script.onload = () => {
        initHotmart();
      };
      document.body.appendChild(script);
    } else {
      // Small timeout to guarantee DOM container has rendered
      const timer = setTimeout(() => {
        initHotmart();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [refused]);

  // Urgency Timer Countdown
  useEffect(() => {
    if (countdown <= 0) return;
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [countdown]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleRefusal = (e: React.MouseEvent) => {
    e.preventDefault();
    setRefused(true);
  };

  return (
    <div id="downsell-page" className="min-h-screen bg-[#F9F8F5] text-[#333333] font-sans selection:bg-[#D4AF37]/20 selection:text-[#333333] flex flex-col justify-between antialiased w-full max-w-full overflow-x-hidden">
      
      {/* Top Discret Minimalist Alert bar */}
      <header id="top-bar" className="bg-[#333333] text-[#F9F8F5] py-2.5 px-4 text-center text-[11px] tracking-[0.15em] uppercase font-sans font-medium">
        <span>Oportunidade Única de Downsell Ativa</span>
        {countdown > 0 && (
          <span className="ml-2 font-mono text-[#D4AF37]">
            — Expira em {formatTime(countdown)}
          </span>
        )}
      </header>

      {/* Main Container */}
      <main id="main-content" className="flex-grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 lg:py-16 flex flex-col justify-center">
        
        {!refused ? (
          <article id="offer-container" className="grid grid-cols-1 lg:grid-cols-[1fr_390px] gap-8 lg:gap-12 items-start">
            
            {/* 1. Header Section: Interruption Lead, Headline & Subheadline */}
            <div id="offer-header" className="order-1 lg:col-start-1 lg:row-start-1 space-y-6">
              
              {/* Lead de Interrupção */}
              <div id="interruption-lead" className="space-y-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#D4AF37] tracking-[0.18em] uppercase font-bold">
                  <Sparkles className="w-3.5 h-3.5" /> Tratamento Exclusivo
                </span>
                <p className="text-base md:text-lg font-serif italic text-gray-600 leading-relaxed">
                  "Aguarda! Este é o meu último <span className="font-semibold text-[#333333] not-italic">mimo</span> para garantir que as tuas malas esgotam primeiro."
                </p>
                <div className="w-12 h-[1px] bg-[#D4AF37]/40 mt-3" />
              </div>

              {/* Headline and Subheadline */}
              <div id="headline-section" className="space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#111111] leading-[1.15] lg:leading-[1.12] tracking-tight font-light">
                  Usa as cores que vendem sozinhas e faz o teu stock esgotar em tempo recorde.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed font-sans font-light">
                  Não fiques com stock parado. Descobre as cores exatas que as clientes de elite em Portugal procuram e sabe como as combinar para valorizar o teu <strong className="font-semibold text-[#333333]">trapilho</strong> diretamente do teu <strong className="font-semibold text-[#333333]">telemóvel</strong>.
                </p>
              </div>

            </div>

            {/* 2. Sidebar Section: Float/Sticky Offer Card (Price, Hotmart Widget, Guarantees) */}
            <div id="offer-sidebar" className="order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-8 w-full">
              <aside className="bg-white p-5 sm:p-8 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-gray-100 text-center space-y-6">
                
                {/* Price Display */}
                <div id="pricing-box" className="space-y-1">
                  <span className="text-[10px] text-gray-400 line-through tracking-wider block">De €19,00</span>
                  <span className="text-3.5xl sm:text-4xl md:text-5xl font-serif font-light text-[#D4AF37] block">
                    €4,90
                  </span>
                  <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-semibold tracking-wider uppercase rounded">
                    Preço de Mimo
                  </span>
                  <p className="text-[10px] text-gray-400 font-sans pt-1">
                    Disponível via <strong className="font-semibold text-gray-600">MB Way</strong> e Cartão
                  </p>
                </div>

                <div className="w-full h-[1px] bg-gray-100" />

                {/* HOTMART SALES FUNNEL WIDGET */}
                <div id="hotmart-funnel-wrapper" className="space-y-4">
                  
                  <div className="text-center">
                    <span className="inline-flex items-center gap-1.5 text-[10px] text-gray-400 font-sans tracking-wider uppercase">
                      <Clock className="w-3.5 h-3.5 text-[#D4AF37]" /> Confirmação 1-Click
                    </span>
                  </div>

                  {/* HOTMART - Sales Funnel Widget */}
                  {/* Container limpo e flexível para evitar conflitos de layout no iframe */}
                  <div className="w-full bg-white rounded-lg">
                    <div id="hotmart-sales-funnel" className="w-full min-h-[120px]">
                      <div className="animate-pulse space-y-3 py-6 px-4 text-center">
                        <div className="h-3 w-32 bg-gray-150 mx-auto rounded"></div>
                        <div className="h-8 w-48 bg-gray-200 mx-auto rounded"></div>
                        <p className="text-[10px] text-gray-400">A carregar checkout seguro da Hotmart...</p>
                      </div>
                    </div>
                  </div>
                  {/* HOTMART - Sales Funnel Widget */}

                </div>

                <div className="w-full h-[1px] bg-gray-100" />

                <p className="text-xs text-gray-500 font-light italic leading-relaxed">
                  Risco Zero. 7 dias de garantia total assegurada pela Hotmart.
                </p>

                {/* Link de Recusa */}
                <div id="refusal-area" className="pt-1">
                  <a 
                    href="#refuse"
                    onClick={handleRefusal}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors duration-300 underline cursor-pointer font-light tracking-wide inline-block leading-relaxed"
                  >
                    Não, prefiro arriscar ficar com material parado na prateleira
                  </a>
                </div>

              </aside>

              {/* Extra badges for credit/trust under the card */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] text-gray-400">
                <div className="p-2.5 bg-white/60 rounded border border-gray-100/60">
                  <ShieldCheck className="w-4 h-4 mx-auto text-[#D4AF37]/70 mb-1" />
                  <span className="block font-medium">Seguro</span>
                </div>
                <div className="p-2.5 bg-white/60 rounded border border-gray-100/60">
                  <Smartphone className="w-4 h-4 mx-auto text-[#D4AF37]/70 mb-1" />
                  <span className="block font-medium">Telemóvel</span>
                </div>
                <div className="p-2.5 bg-white/60 rounded border border-gray-100/60">
                  <Landmark className="w-4 h-4 mx-auto text-[#D4AF37]/70 mb-1" />
                  <span className="block font-medium">MB Way</span>
                </div>
              </div>
            </div>

            {/* 3. Body Section: Swatches Preview & Core Value Bullet Points */}
            <div id="offer-body" className="order-3 lg:col-start-1 lg:row-start-2 space-y-10 pt-4 lg:pt-0">
              
              {/* European Color Palette Visual Mockup Container */}
              <div id="palette-preview" className="bg-white border border-gray-100 p-5 sm:p-8 rounded-lg shadow-[0_12px_30px_rgba(0,0,0,0.015)] space-y-6">
                
                <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                  <div>
                    <h3 className="font-serif text-lg text-[#333333]">Guia de Cores</h3>
                    <p className="text-[10px] sm:text-[11px] text-gray-400 tracking-wider uppercase font-sans">Edição Especial de Tendência Europeia</p>
                  </div>
                  <div className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] sm:text-[11px] font-medium tracking-wide uppercase rounded">
                    Ebook Premium
                  </div>
                </div>

                {/* Elegant Swatch Display */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
                  <div className="space-y-1.5 text-center">
                    <div className="h-10 sm:h-14 rounded bg-[#5C6B73] shadow-inner transition-transform hover:scale-105 duration-200" />
                    <p className="text-[9px] sm:text-[10px] font-mono font-medium text-gray-500 truncate">Milão Slate</p>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <div className="h-10 sm:h-14 rounded bg-[#D6C5B3] shadow-inner transition-transform hover:scale-105 duration-200" />
                    <p className="text-[9px] sm:text-[10px] font-mono font-medium text-gray-500 truncate">Paris Sand</p>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <div className="h-10 sm:h-14 rounded bg-[#8E7C5B] shadow-inner transition-transform hover:scale-105 duration-200" />
                    <p className="text-[9px] sm:text-[10px] font-mono font-medium text-gray-500 truncate">Cascais Gold</p>
                  </div>
                  <div className="space-y-1.5 text-center">
                    <div className="h-10 sm:h-14 rounded bg-[#A45C3F] shadow-inner transition-transform hover:scale-105 duration-200" />
                    <p className="text-[9px] sm:text-[10px] font-mono font-medium text-gray-500 truncate">Lisboa Rust</p>
                  </div>
                </div>

                <p className="text-xs text-center text-gray-400 italic">
                  Amostras das tonalidades de prestígio que irão ditar os preços do mercado este ano.
                </p>
              </div>

              {/* Bullet Points - O que vais dominar */}
              <div id="bullet-points" className="space-y-5">
                <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#D4AF37]">
                  O que vais dominar com este guia:
                </h2>
                <div className="grid gap-4 sm:grid-cols-3">
                  
                  <div className="flex flex-col gap-3 bg-white p-5 rounded-lg border border-gray-100 transition-all hover:border-[#D4AF37]/30 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                    <div className="bg-[#D4AF37]/10 p-1.5 rounded-full text-[#D4AF37] w-fit">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#333333]">Paleta "Elite Portugal"</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        As cores exclusivas que vão dominar Lisboa e Cascais nesta estação.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 bg-white p-5 rounded-lg border border-gray-100 transition-all hover:border-[#D4AF37]/30 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                    <div className="bg-[#D4AF37]/10 p-1.5 rounded-full text-[#D4AF37] w-fit">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#333333]">Manual de Combinação</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Como misturar tons importados para criar peças com desejo imediato.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 bg-white p-5 rounded-lg border border-gray-100 transition-all hover:border-[#D4AF37]/30 shadow-[0_4px_12px_rgba(0,0,0,0.01)]">
                    <div className="bg-[#D4AF37]/10 p-1.5 rounded-full text-[#D4AF37] w-fit">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-[#333333]">Guia de Sazonalidade</h4>
                      <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                        Sabe o que vender e quando vender para nunca perderes o "timing".
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </article>
        ) : (
          <article id="refusal-feedback" className="text-center space-y-8 py-12 max-w-md mx-auto bg-white p-8 rounded-lg shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-gray-100">
            <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto text-[#D4AF37]">
              <AlertCircle className="w-8 h-8" />
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-serif text-[#333333]">Decisão Registada</h2>
              <p className="text-sm text-gray-500 leading-relaxed">
                Compreendemos a tua escolha. A oportunidade de adicionar o <strong className="font-medium">Guia de Cores: Tendência Europeia</strong> pelo preço de <strong className="font-medium">mimo de €4,90</strong> foi dispensada.
              </p>
              <p className="text-xs text-gray-400">
                Podes continuar a navegar ou fechar esta janela no teu telemóvel a qualquer momento.
              </p>
            </div>

            <div className="pt-6">
              <button 
                onClick={() => setRefused(false)} 
                className="inline-flex items-center gap-2 text-xs text-[#D4AF37] hover:text-[#333333] transition-colors uppercase tracking-wider font-semibold"
              >
                Mudei de ideias, quero aproveitar por €4,90 <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>
        )}

      </main>

      {/* Elegant minimalist footer */}
      <footer id="main-footer" className="border-t border-gray-100 py-6 text-center text-[10px] text-gray-400 tracking-wider uppercase font-sans">
        <p>© {new Date().getFullYear()} Guia de Cores • Atelier de Elite • Todos os direitos reservados</p>
        <p className="mt-1 text-[9px] lowercase tracking-normal text-gray-300">Processado de forma segura através da plataforma oficial Hotmart.</p>
      </footer>

    </div>
  );
}
