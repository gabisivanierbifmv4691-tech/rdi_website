import { motion } from 'motion/react';
import type { Language } from '../App';

interface ImprintPageProps {
  lang: Language;
}

export default function ImprintPage({ lang }: ImprintPageProps) {
  const t = {
    title: lang === 'cn' ? '法律声明' : 'IMPRINT',
    intro: lang === 'cn' 
      ? '有关本网站法律责任及版权的相关信息。'
      : 'Legal information regarding the responsibility for the content and copyright of this website.',
    sections: [
      {
        title: lang === 'cn' ? '联系信息' : 'CONTACT INFORMATION',
        content: (
          <div className="space-y-8">
            <div>
              <p className="font-bold">RDI LIGHTING AG</p>
              <p>Ingenieure Designer Architekten für Beleuchtung</p>
              <p className="mt-2 text-gray-500">
                Jagdweg 16 | 53115 Bonn<br />
                Tel +49 228 914 22-0 Fax +49 (0) 228 911 244<br />
                bonn@rdilighting.com
              </p>
            </div>
            <div>
              <p className="font-bold">Berlin Office</p>
              <p className="text-gray-500">
                Schlesische Strasse 27 | 10997 Berlin<br />
                Tel +49 30 617 931-0 Fax +49 (0) 30 617 0083<br />
                berlin@rdilighting.com
              </p>
            </div>
            <div>
              <p className="font-bold">Barcelona Design Hub</p>
              <p className="text-gray-500">
                Carrer de Llull 57, ático 5 | 08005 Barcelona<br />
                Tel +34 930 180 990<br />
                barcelona@rdilighting.com
              </p>
            </div>
          </div>
        )
      },
      {
        title: lang === 'cn' ? '依据 § 5 TMG 的信息' : 'INFORMATION ACCORDING TO § 5 TMG',
        content: (
          <div className="text-sm space-y-2">
            <p>RDI Lighting AG</p>
            <p>Jagdweg 16, 53115 Bonn</p>
            <p>Represented by: Prof. Dipl.-Ing. Andreas Schulz</p>
          </div>
        )
      },
      {
        title: lang === 'cn' ? '注册登记' : 'REGISTER ENTRY',
        content: (
          <div className="text-sm space-y-2">
            <p>Entry in the Commercial Register:</p>
            <p>Registration court: Amtsgericht Bonn</p>
            <p>Registration number: HRB 14779</p>
            <p>Chairman of the supervisory board: Lennart Krause</p>
            <p>Chairman of the executive board: Prof. Dipl.-Ing. Andreas Schulz</p>
          </div>
        )
      },
      {
        title: lang === 'cn' ? '税务编号' : 'TAX NUMBER',
        content: (
          <div className="text-sm space-y-2">
            <p>VAT identification number Umsatzsteuer-Identifikationsnummer in accordance with § 27 a Value Added Tax (VAT) Act:</p>
            <p>DE 164 181 260</p>
            <p className="mt-4 font-bold">Responsibly for the contents after §55 paragraph 2 RStV</p>
            <p>Prof. Dipl.-Ing. Andreas Schulz</p>
            <p>Jagdweg 16, D-53115 Bonn</p>
          </div>
        )
      },
      {
        title: lang === 'cn' ? '法律免责声明' : 'LEGAL DISCLAIMER',
        content: (
          <div className="space-y-6 text-sm">
            <div>
              <p className="font-bold mb-2">Contents of the website</p>
              <p>The contents of this website were written with due diligence and by the author's best knowledge. We can be held liable only by general laws, especially for our own contents acc. § 7 TMG (German law on tele-media) and for external contents acc. §§ 8 - 10 TMG. As a Provider of tele-media we can be held liable for external contents only once we have knowledge of a concrete infringement of law. We reserve the right to change or delete contents of this webpage which are not subject to any contractual obligation.</p>
            </div>
            <div>
              <p className="font-bold mb-2">Links on external websites</p>
              <p>Contents of external websites on which we are linking direct or indirect (through "hyperlinks" or "deeplinks") are beyond our responsibility and are not adopted as our own content. When the links were published, we didn't have knowledge of any illegal activities or contents on these websites. Since we do not have any control on the contents of these websites, we distance ourselves from all contents of all linked websites, which were updated after the setting of the links. For all contents and especially damages, resulting of the use of the linked websites, only the provider of these linked websites can be held liable. If we receive knowledge of illegal contents on these linked websites, we will delete the according links.</p>
            </div>
            <div>
              <p className="font-bold mb-2">Intellectual property rights</p>
              <p>All content of this website, especially texts, pictures, images, graphical presentations, music, trademarks, brands and so forth, are subject to copyright laws. The use, reproduction and so on are subject to the individual rights of the respective owner of the copyright or administrator of these rights. If you want to use such content, please let us know and we will establish contact with the respective owner/administrator.</p>
            </div>
          </div>
        )
      }
    ]
  };

  return (
    <div className="pt-32 pb-20 bg-white">
      {/* Header Section */}
      <section className="text-center mb-24 px-8 overflow-hidden">
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-gray-900"
        >
          {t.intro}
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="text-[12vw] font-black tracking-tighter leading-none text-gray-100 uppercase select-none pointer-events-none"
        >
          IMPRINT
        </motion.h1>
      </section>

      {/* Content Section */}
      <section className="max-w-4xl mx-auto px-8 md:px-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="space-y-16"
        >
          {t.sections.map((section, idx) => (
            <div key={idx} className="border-l border-gray-100 pl-8">
              <h2 className="text-xl font-bold uppercase tracking-wider mb-6 text-gray-900">
                {section.title}
              </h2>
              <div className="text-gray-600 leading-relaxed font-medium">
                {section.content}
              </div>
            </div>
          ))}

          <div className="pt-12 mt-12 border-t border-gray-100">
            <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
              {lang === 'cn' ? '最后更新于: 2026年5月' : 'Last updated: May 2026'}
            </p>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
