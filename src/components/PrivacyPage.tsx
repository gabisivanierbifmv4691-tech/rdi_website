import { motion } from 'motion/react';
import type { Language } from '../App';

interface PrivacyPageProps {
  lang: Language;
}

export default function PrivacyPage({ lang }: PrivacyPageProps) {
  const t = {
    title: lang === 'cn' ? '隐私政策' : 'Privacy Policy',
    intro: lang === 'cn' 
      ? '我们非常欢迎您对我们公司表现出的兴趣。数据保护对 RDI 瑞国际照明设计管理团队具有特别高的优先级。'
      : 'We are very delighted that you have shown interest in our enterprise. Data protection is of a particularly high priority for the management of RDI Lighting.',
    sections: [
      {
        title: lang === 'cn' ? '1. 一般说明' : '1. General information',
        content: lang === 'cn'
          ? '通过这些数据保护声明，我们的公司希望向公众通报我们收集、使用和处理的个人数据的性质、范围和目的。此外，通过本数据保护声明，向数据主体通报他们享有的权利。'
          : 'By means of this data protection declaration, our enterprise would like to inform the general public of the nature, scope, and purpose of the personal data we collect, use and process. Furthermore, data subjects are informed, by means of this data protection declaration, of the rights to which they are entitled.'
      },
      {
        title: lang === 'cn' ? '2. 控制者的名称和地址' : '2. Name and Address of the controller',
        content: lang === 'cn'
          ? '出于《通用数据保护条例》（GDPR）、适用于欧盟成员国的其他数据保护法以及与数据保护相关的其他规定的目的，控制者是：RDI Lighting, Jagdweg 16, 53115 Bonn, Germany.'
          : 'Controller for the purposes of the General Data Protection Regulation (GDPR), other data protection laws applicable in Member states of the European Union and other provisions related to data protection is: RDI Lighting, Jagdweg 16, 53115 Bonn, Germany.'
      },
      {
        title: lang === 'cn' ? '3. Cookie 的使用' : '3. Use of Cookies',
        content: lang === 'cn'
          ? '本网站的网页使用 Cookie。Cookie 是通过互联网浏览器存储在计算机系统中的文本文件。许多网站和服务器都使用 Cookie。许多 Cookie 包含所谓的 Cookie ID。Cookie ID 是 Cookie 的唯一标识符。它由一个字符串组成，通过该字符串，网页和服务器可以分配给存储该 Cookie 的特定互联网浏览器。'
          : 'The Internet pages of RDI Lighting use cookies. Cookies are text files that are stored in a computer system via an Internet browser. Many Internet pages and servers use cookies. Many cookies contain a so-called cookie ID. A cookie ID is a unique identifier of the cookie. It consists of a character string through which Internet pages and servers can be assigned to the specific Internet browser in which the cookie was stored.'
      },
      {
        title: lang === 'cn' ? '4. 一般数据和信息的收集' : '4. Collection of general data and information',
        content: lang === 'cn'
          ? '当数据主体或自动化系统调用网站时，网站会收集一系列一般数据和信息。这些一般数据和信息存储在服务器日志文件中。收集的数据可能包括（1）使用的浏览器类型和版本，（2）接入系统使用的操作系统，（3）接入系统访问我们网站的来源网站（所谓的转介来源），（4）子网站，（5）访问网站的日期和时间，（6）互联网协议地址（IP 地址），（7）接入系统的互联网服务提供商，以及（8）在调用我们的信息技术系统发生攻击时用于防御的任何其他类似数据和信息。'
          : 'The website collects a series of general data and information when a data subject or automated system calls up the website. This general data and information are stored in the server log files. Collected may be (1) the browser types and versions used, (2) the operating system used by the accessing system, (3) the website from which an accessing system reaches our website (so-called referrers), (4) the sub-websites, (5) the date and time of access to the Internet site, (6) an Internet protocol address (IP address), (7) the Internet service provider of the accessing system, and (8) any other similar data and information that may be used in the event of attacks on our information technology systems.'
      },
      {
        title: lang === 'cn' ? '5. 您的权利' : '5. Your Rights',
        content: lang === 'cn'
          ? '根据 GDPR，您拥有以下权利：确认权、访问权、更正权、删除权（被遗忘权）、限制处理权、数据可携带权、反对权、撤回数据保护同意的权利。'
          : 'Under the GDPR, you have the following rights: Right of confirmation, Right of access, Right to rectification, Right to erasure (Right to be forgotten), Right of restriction of processing, Right to data portability, Right to object, Right to withdraw data protection consent.'
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
          PRIVACY
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
              <p className="text-gray-600 leading-relaxed text-sm md:text-base font-medium">
                {section.content}
              </p>
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
