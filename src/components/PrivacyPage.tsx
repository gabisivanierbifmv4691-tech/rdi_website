import { motion } from 'motion/react';
import type { Language } from '../App';

interface PrivacyPageProps {
  lang: Language;
}

export default function PrivacyPage({ lang }: PrivacyPageProps) {
  const isCN = lang === 'cn';

  const t = {
    title: isCN ? '隐私政策' : 'Privacy Policy',
    intro: isCN 
      ? 'RDI瑞国际照明设计高度重视全球用户的个人隐私与数据安全保护，数据合规与隐私保护为公司核心管理优先级。本全球隐私政策依据中国《个人信息保护法》《网络安全法》《数据安全法》、欧盟GDPR通用数据保护条例、美国加州CCPA/CPRA消费者隐私法案及国际通用数据保护准则制定，全面适配多区域合规要求，透明公示我司个人数据收集、使用、存储、传输、处理全流程规则，并明确全球各地用户对应的合法权益。'
      : 'RDI Lighting highly values the personal privacy and data security of our global users. Data compliance and privacy protection are of core administrative priority for the company. This Global Privacy Policy is formulated in accordance with China\'s Personal Information Protection Law (PIPL), Cybersecurity Law, and Data Security Law, the EU\'s General Data Protection Regulation (GDPR), the California Consumer Privacy Act/California Privacy Rights Act (CCPA/CPRA), and international data protection guidelines. It fully adapts to multi-regional compliance requirements, transparently discloses our entire process rules for personal data collection, use, storage, transmission, and processing, and clarifies the corresponding legal rights and interests of users around the world.',
    lastUpdated: isCN ? '最后更新日期：2026年5月' : 'Last updated: May 2026',
    sections: [
      {
        title: isCN ? '一、适用范围与合规依据' : 'I. Scope of Application and Compliance Basis',
        content: isCN ? (
          <div className="space-y-4">
            <p>本政策适用于RDI瑞国际照明设计官方网站、线上服务端口、商务咨询对接及所有线上数字化服务场景，对全球范围内所有访问用户、合作主体的数据处理行为均具有约束力。</p>
            <p>我司严格遵循全球多区域合规体系：中国境内业务严格遵守《中华人民共和国个人信息保护法》《数据安全法》《网络安全法》；面向欧盟用户严格执行GDPR条例；面向美国加州用户适配CCPA/CPRA法案；同时遵从国际通用数据保护基本原则，实现全球化统一合规管控。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>This Policy applies to the official website, online service portals, business consultation interfaces, and all online digital service scenarios of RDI Lighting, and is binding on the data processing activities of all visitors and cooperating entities worldwide.</p>
            <p>Our company strictly adheres to a multi-regional compliance framework: operations within China strictly comply with the PIPL, Data Security Law, and Cybersecurity Law of the People\'s Republic of China; services targeting EU users strictly enforce the GDPR; services targeting California, USA users adapt to the CCPA/CPRA; we simultaneously comply with basic international data protection principles to achieve unified global compliance control.</p>
          </div>
        )
      },
      {
        title: isCN ? '二、数据控制主体信息' : 'II. Data Controller Information',
        content: isCN ? (
          <div className="space-y-4">
            <p>依据全球各国及地区数据保护法规，本数据处理行为的法定控制主体信息如下：</p>
            <div className="pl-4 border-l border-neutral-200 py-1 space-y-2">
              <p className="font-bold">中国境内数据控制主体：</p>
              <p>主体名称：上海瑞逸环境设计有限公司</p>
              <p>注册地址：上海市纪念路8号1号楼205室</p>
            </div>
            <div className="pl-4 border-l border-neutral-200 py-1 space-y-2">
              <p className="font-bold">欧盟/海外区域数据控制主体：</p>
              <p>主体名称：RDI Lighting</p>
              <p>注册地址：Room B12, 11/F, Blocks B & C, Tai Cheong Factory Building, 3 Wing Ming Street, Cheung Sha Wan, Kowloon, Hong Kong</p>
            </div>
            <p>我司实行双主体属地合规管理：中国境内用户数据由上海瑞逸环境设计有限公司属地负责管理与合规履约；欧盟、美国及其他海外区域用户数据由RDI Lighting负责合规管控，分别严格对应各区域属地数据保护法律法规，保障全球用户隐私权益合规落地。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>In accordance with global data protection laws and regulations, the legal data controller information for data processing activities is as follows:</p>
            <div className="pl-4 border-l border-neutral-200 py-1 space-y-2">
              <p className="font-bold">Data Controller in Mainland China:</p>
              <p>Entity Name: Shanghai Ruiyi Environmental Design Co., Ltd.</p>
              <p>Registered Address: Room 205, Building 1, No. 8 Jimian Road, Shanghai, China</p>
            </div>
            <div className="pl-4 border-l border-neutral-200 py-1 space-y-2">
              <p className="font-bold">Data Controller in EU/Overseas Regions:</p>
              <p>Entity Name: RDI Lighting</p>
              <p>Registered Address: Room B12, 11/F, Blocks B & C, Tai Cheong Factory Building, 3 Wing Ming Street, Cheung Sha Wan, Kowloon, Hong Kong</p>
            </div>
            <p>Our company implements dual-entity territorial compliance management: user data in mainland China is managed locally by Shanghai Ruiyi Environmental Design Co., Ltd., which is responsible for localized compliance fulfillment; user data in the EU, USA, and other overseas regions is under the compliance control of RDI Lighting. Each strictly corresponds to regional data protection laws and regulations, ensuring the legal landing of global user privacy rights and interests.</p>
          </div>
        )
      },
      {
        title: isCN ? '三、数据处理核心原则（全球通用）' : 'III. Core Data Processing Principles (Global)',
        content: isCN ? (
          <p>我司所有个人数据处理活动统一遵循国际通用合规原则：合法合规、公开透明、目的限定、数据最小化、精准保真、存储限时、安全保密、全程可问责，仅收集、处理业务及网站运营必要数据，杜绝过度采集、违规滥用用户个人信息。</p>
        ) : (
          <p>All of our personal data processing activities uniformly adhere to international compliance principles: lawfulness, fairness, and transparency; purpose limitation; data minimization; accuracy; storage limitation; integrity and confidentiality; and accountability. We only collect and process data essential for business and website operations, completely eliminating excessive collection or illicit abuse of users\' personal information.</p>
        )
      },
      {
        title: isCN ? '四、Cookie与跟踪技术使用规则' : 'IV. Cookies and Tracking Technologies',
        content: isCN ? (
          <div className="space-y-4">
            <p>我司官方网站使用Cookie及同类轻量化跟踪技术，用于保障网站稳定运行、优化用户访问体验、统计网站访问数据。Cookie是存储于用户终端浏览器的小型文本文件，可识别用户访问设备与浏览偏好，无恶意采集、窃取私密信息功能。</p>
            <p>依据全球合规要求，非必要Cookie需获取用户主动明确同意后方可启用，用户可随时通过浏览器设置拒绝、清除Cookie。我司不会通过Cookie开展违规追踪、强制营销，所有Cookie数据仅用于网站运维与体验优化，留存期限严格遵循各区域法规要求。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>Our official website uses cookies and similar lightweight tracking technologies to ensure stable website operation, optimize user experience, and compile website traffic statistics. Cookies are small text files stored in the browser of the user\'s terminal to recognize the user\'s visiting device and browsing preferences, with no functionality to maliciously collect or steal private information.</p>
            <p>In accordance with global compliance requirements, non-essential cookies require the user\'s active and explicit consent before being enabled, and users can reject or clear cookies at any time through browser settings. We do not use cookies for illicit tracking or forced marketing. All cookie data is used solely for website operation and experience optimization, and the retention period strictly complies with regional laws and regulations.</p>
          </div>
        )
      },
      {
        title: isCN ? '五、常规数据收集与使用说明' : 'V. General Data Collection and Use',
        content: isCN ? (
          <div className="space-y-4">
            <p>用户访问我司官网时，服务器将自动采集并留存网站运维所需的通用访问数据，统一存储于加密服务器日志中，仅用于安全防护、故障排查、服务优化、风险溯源，不用于商业倒卖、恶意营销。收集范围包含：浏览器类型及版本、终端操作系统、访问来源页面、访问子页面与浏览路径、访问时间、IP地址、网络服务提供商及网络安全防御所需辅助数据。</p>
            <p>所有数据严格执行数据最小化原则，仅保留必要留存周期，到期自动清理，同时落实分级安全防护机制，防范数据泄露、篡改、丢失风险。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>When users visit our official website, our servers automatically collect and retain general access data required for website maintenance, stored uniformly in encrypted server logs, solely used for security defense, troubleshooting, service optimization, and risk tracing—never for commercial resale or malicious marketing. The scope of collection includes: browser type and version, terminal operating system, referral source page, visited sub-pages and browsing paths, access time, IP address, Internet service provider, and auxiliary data needed for network security defense.</p>
            <p>All data strictly follows the data minimization principle, with only the necessary retention cycles being kept before automatic cleanup upon expiration. At the same time, we implement multi-level security protection mechanisms to prevent data leakage, tampering, and loss risks.</p>
          </div>
        )
      },
      {
        title: isCN ? '六、数据存储、共享与跨境传输' : 'VI. Data Storage, Sharing, and Cross-Border Transfer',
        content: isCN ? (
          <div className="space-y-4">
            <p><span className="font-bold">1. 数据存储：</span>中国境内用户数据严格遵循属地管理要求，优先境内合规存储；海外用户数据根据服务区域合规存储，全程加密防护。</p>
            <p><span className="font-bold">2. 数据共享：</span>我司仅在用户同意、法定要求、合同履约必要的前提下，向合规合作服务商适度共享必要数据，严禁无授权第三方共享、非法流转用户个人信息。</p>
            <p><span className="font-bold">3. 跨境传输：</span>针对欧盟、美国及国际跨境数据传输，我司采用合规跨境机制，适配GDPR标准合同条款（SCC）、中美欧跨境数据通用合规规范，保障跨境数据传输合法、安全、可控。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p><span className="font-bold">1. Data Storage: </span>User data in mainland China strictly follows local administrative requirements, with priority given to localized compliant storage; overseas user data is stored compliantly according to the service region, protected by full encryption throughout.</p>
            <p><span className="font-bold">2. Data Sharing: </span>Our company will only share necessary data with compliant cooperative service providers under the prerequisites of user consent, statutory requirements, and contract performance necessities, strictly forbidding unauthorized third-party sharing or illicit transfer of users\' personal information.</p>
            <p><span className="font-bold">3. Cross-Border Transfer: </span>For cross-border data transmission involving the EU, USA, or international regions, we adopt compliant cross-border transfer mechanisms, adapting to the GDPR Standard Contractual Clauses (SCCs) and China-US-EU cross-border data general compliance standards to ensure that cross-border transfers are lawful, secure, and controllable.</p>
          </div>
        )
      },
      {
        title: isCN ? '七、全球用户法定权利（分区域适配）' : 'VII. Legal Rights of Global Users (Regionally Adapted)',
        content: isCN ? (
          <div className="space-y-4">
            <p>根据中国、欧盟、美国及国际数据保护法规，不同区域用户享有对应法定权益，我司均提供合规响应通道：</p>
            <p><span className="font-bold">1. 欧盟用户（GDPR）：</span>享有数据确认权、访问权、更正权、删除权（被遗忘权）、处理限制权、数据可携带权、反对处理权、同意随时撤回权。</p>
            <p><span className="font-bold">2. 美国加州用户（CCPA/CPRA）：</span>享有个人信息知情权、访问权、删除权、拒绝个人信息售卖权、平等服务权，我司承诺不售卖任何用户个人信息。</p>
            <p><span className="font-bold">3. 中国用户（PIPL）：</span>享有个人信息知情权、决定权、查阅复制权、更正删除权、撤回同意权、限制处理权及投诉举报权。</p>
            <p><span className="font-bold">4. 国际通用权益：</span>所有全球用户均可申请查询自身数据处理状态，对违规数据处理行为提出异议并申请整改。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>In accordance with Chinese, EU, US, and international data protection regulations, users in different regions enjoy corresponding statutory rights and interests, for which our company provides compliant response channels:</p>
            <p><span className="font-bold">1. EU Users (GDPR): </span>Enjoy the right of confirmation, right of access, right to rectification, right to erasure (right to be forgotten), right to restriction of processing, right to data portability, right to object, and the right to withdraw consent at any time.</p>
            <p><span className="font-bold">2. California, US Users (CCPA/CPRA): </span>Enjoy the right to know what personal information is collected, right of access, right to delete, right to opt-out of the sale of personal information, and the right to equal service. Our company pledges not to sell any user\'s personal information.</p>
            <p><span className="font-bold">3. Chinese Users (PIPL): </span>Enjoy the right to know and decide on personal information processing, right of access and copy, right to rectification and deletion, right to withdraw consent, right to restrict processing, and the right to lodge complaints and reports.</p>
            <p><span className="font-bold">4. General International Rights: </span>All global users can apply to query the status of their data processing, object to non-compliant data processing activities, and request rectification.</p>
          </div>
        )
      },
      {
        title: isCN ? '八、数据安全防护措施' : 'VIII. Data Security Protection Measures',
        content: isCN ? (
          <p>我司建立全流程数据安全管理制度，配套技术防护与内控 management 机制，从数据采集、存储、传输、使用、销毁全生命周期落实安全管控，防范个人信息泄露、丢失、篡改、滥用风险，持续适配全球各区域数据安全合规标准。</p>
        ) : (
          <p>Our company has established a comprehensive data security management system, backed by technical protections and internal control mechanisms. We implement safety controls throughout the entire lifecycle of data collection, storage, transfer, use, and destruction, preventing personal information leakage, loss, alteration, or abuse, and continuously matching global and regional data security compliance standards.</p>
        )
      },
      {
        title: isCN ? '九、政策更新与告知' : 'IX. Policy Updates and Notification',
        content: isCN ? (
          <p>我司可根据各国法律法规更新、业务优化需求适时修订本全球隐私政策。政策更新后将通过官网首页公示生效，持续保障全球用户隐私权益合规落地。</p>
        ) : (
          <p>We may revise this Global Privacy Policy from time to time in accordance with national legal and regulatory updates and business optimization requirements. Once updated, the policy will be publicized and take effect on the official website homepage, continuing to safeguard the privacy rights and interests of our global users.</p>
        )
      },
      {
        title: isCN ? '十、争议解决与管辖' : 'X. Dispute Resolution and Jurisdiction',
        content: isCN ? (
          <p>因本政策产生的争议，优先友好协商解决。同时遵循属地管辖原则：中国区域用户适用中华人民共和国法律；欧盟用户适用欧盟及成员国属地法规；美国用户适用对应州级隐私法规，兼顾国际通用数据保护准则。</p>
        ) : (
          <p>Any disputes arising from this Policy shall be resolved first through friendly consultation. We adhere to the principle of territorial jurisdiction: users in China shall be governed by the laws of the People\'s Republic of China; users in the EU shall be governed by EU and member state local regulations; users in the United States shall be governed by corresponding state-level privacy laws, whilst giving due consideration to general international data protection principles.</p>
        )
      }
    ]
  };

  return (
    <div className="pt-32 pb-24 bg-white px-6 md:px-12 flex justify-center">
      <div className="w-full max-w-[1280px]">
        {/* Title Section */}
        <section className="text-left mb-16">
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs font-bold uppercase tracking-[0.25em] mb-4 text-black"
          >
            {isCN ? '全球隐私与数据安全保护条例' : 'GLOBAL PRIVACY & DATA SECURITY'}
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-4xl md:text-5xl font-black tracking-tight text-black uppercase"
          >
            {t.title}
          </motion.h1>
        </section>

        {/* Intro Section */}
        <section className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pb-8 border-b border-neutral-100"
          >
            <p className="text-black leading-relaxed font-light text-base md:text-lg">
              {t.intro}
            </p>
          </motion.div>
        </section>

        {/* Main content body */}
        <section className="w-full">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="space-y-12"
          >
            {t.sections.map((section, idx) => (
              <div key={idx} className="pb-8 border-b border-neutral-100 last:border-0 last:pb-0">
                <h2 className="text-xl font-bold tracking-wider mb-4 text-black">
                  {section.title}
                </h2>
                <div className="text-neutral-900 leading-relaxed text-base font-light space-y-3">
                  {section.content}
                </div>
              </div>
            ))}

            {/* Date Stamp */}
            <div className="pt-10 mt-12 border-t border-neutral-200">
              <p className="text-sm uppercase tracking-widest text-black font-bold">
                {t.lastUpdated}
              </p>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
}
