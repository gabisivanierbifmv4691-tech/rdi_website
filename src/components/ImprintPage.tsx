import { motion } from 'motion/react';
import type { Language } from '../App';

interface ImprintPageProps {
  lang: Language;
}

export default function ImprintPage({ lang }: ImprintPageProps) {
  const isCN = lang === 'cn';

  const t = {
    title: isCN ? '法律声明与版权免责声明' : 'Legal Statement & Copyright Disclaimer',
    intro: isCN 
      ? '本网站法律声明依据中华人民共和国《民法典》《著作权法》《网络安全法》、欧盟《电信媒体法（TMG）》《数字服务法案（DSA）》《通用数据保护条例（GDPR）》、美国及北美地区相关网络与知识产权法律法规以及国际通用互联网合规准则制定，适用于RDI瑞国际照明设计全球官方网站全部内容与服务，统一规范网站使用权责、内容责任、外链义务及知识产权保护规则，对所有网站访问使用者具有约束力。'
      : 'This Legal Statement is formulated in accordance with the Civil Code, Copyright Law, and Cybersecurity Law of the People\'s Republic of China; the Telemedia Act (TMG), Digital Services Act (DSA), and General Data Protection Regulation (GDPR) of the European Union; relevant internet and intellectual property laws and regulations of the United States and North America; and international general internet compliance standards. It applies to all content and services of the global official website of RDI Lighting, uniformly regulating website usage rights and duties, content liability, external link obligations, and intellectual property protection rules, and is binding on all website users and visitors.',
    lastUpdated: isCN ? '最后更新日期：2026年5月' : 'Last updated: May 2026',
    sections: [
      {
        title: isCN ? '一、网站内容责任与免责' : 'I. Website Content Liability and Disclaimer',
        content: isCN ? (
          <div className="space-y-4">
            <p>本网站所有原创内容均经审慎编撰、严谨校对，依托专业认知如实发布，力求内容真实、准确、完整、合规。</p>
            <p>在全球合规框架下，我司内容责任严格遵循属地法律规则：依据欧盟《电信媒体法（TMG）》第7条，我司对自有原创内容依法承担相应法律责任；依据《电信媒体法（TMG）》第8至10条，对于网站转载、引用的外部第三方内容，我司仅在明确知晓内容存在违法侵权情形时，承担对应处置与合规责任。结合中国《民法典》网络服务避风港原则、北美互联网服务免责规则，我司在无主观过错、未知悉违法内容的前提下，不对第三方内容瑕疵承担直接侵权责任。</p>
            <p>我司保留在无合同约定约束的前提下，无需提前告知，自主修订、更新、优化或删除网站任意内容的合法权利，用于适配业务发展、政策更新与合规要求。除法定强制性责任外，我司不承担因用户自行使用网站内容所产生的直接或间接损失。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>All original content on this website has been carefully compiled and rigorously proofread, published in good faith based on professional expertise, striving to ensure that the content is genuine, accurate, complete, and compliant.</p>
            <p>Under the global compliance framework, our liability for content strictly follows territorial legal rules: pursuant to Section 7 of the German Telemedia Act (TMG), we are legally liable for our own original content; pursuant to Sections 8 to 10 of the TMG, we are only liable for transmitted or referenced external third-party content when we have actual knowledge of illegal or infringing activities and fail to act. Combining the "safe harbor" principle of the Civil Code of the PRC and North American internet service provider safe harbor rules, we do not bear direct infringement liability for third-party content defects in the absence of subjective fault and without knowledge of illegal content.</p>
            <p>We reserve the right to independently modify, update, optimize, or delete any content on this website at any time without prior notice, provided there are no binding contractual obligations, in order to adapt to business development, policy updates, and compliance requirements. Except for statutory mandatory liability, we shall not be liable for any direct or indirect losses arising from users\' self-directed use of the website content.</p>
          </div>
        )
      },
      {
        title: isCN ? '二、外部链接免责声明' : 'II. External Links Disclaimer',
        content: isCN ? (
          <div className="space-y-4">
            <p>本网站可能包含指向第三方平台、合作机构及外部网站的超链接、深度链接等跳转渠道。所有外部链接仅为便利用户查阅、拓展信息渠道而设置，我司不对任何外部网站的内容、运营状态、合法性、安全性、真实性承担担保与法律责任，外部网站内容不归属本网站所有，亦不代表我司观点与立场。</p>
            <p>链接上线之初，我司已审慎核查，未发现对应外部网站存在违法、违规、侵权内容。同时，我司无权限、无义务持续管控第三方网站的后续内容更新、运营变更与合规状态，因此对链接上线后第三方网站新增、变更的全部内容，一律免责。</p>
            <p>依据中欧及北美通用网络合规规则，所有外部网站的内容权责、运营责任、侵权赔偿责任均由对应网站运营主体独立承担。若我司获知链接指向网站存在违法、侵权、违规内容，将第一时间核查并永久移除对应链接，履行合规处置义务。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>This website may contain hyperlinks, deep links, and other redirection paths to third-party platforms, partner institutions, and external websites. All external links are provided solely for the convenience of user reference and expanding information channels; we do not guarantee or bear any legal liability for the content, operational status, legality, security, or authenticity of any external websites. External website content does not belong to this website, nor does it represent our views or positions.</p>
            <p>At the time of link publication, we conducted diligent verification and found no illegal, non-compliant, or infringing content on the corresponding external websites. Meanwhile, we have no authority or obligation to continuously monitor subsequent content updates, operational changes, and compliance statuses of third-party websites; hence, we are fully disclaimed from any new or altered content on third-party websites after the links are published.</p>
            <p>In accordance with common network compliance rules in China, Europe, and North America, all content rights, operational liabilities, and infringement compensation liabilities of external websites shall be independently borne by the respective operating entities. If we become aware that a linked website contains illegal, infringing, or non-compliant content, we will investigate immediately and permanently remove the corresponding link to fulfill our compliance obligations.</p>
          </div>
        )
      },
      {
        title: isCN ? '三、知识产权与版权保护' : 'III. Intellectual Property and Copyright Protection',
        content: isCN ? (
          <div className="space-y-4">
            <p>本网站全部原创内容，包括但不限于文字文案、项目案例、图片影像、视觉设计、图形标识、品牌商标、排版样式、影音素材、设计理念及各类数字化展示内容，均受中国著作权法、欧盟知识产权条例、美国版权法及国际知识产权公约的全面保护。</p>
            <p>网站所有商标、品牌、视觉IP、项目成果等知识产权均归属于上海瑞逸环境设计有限公司（RDI瑞国际照明设计）或对应合法权利人所有。未经我司或相关版权权利人书面正式授权，任何单位、个人不得擅自复制、转载、篡改、传播、商用、二次演绎、批量使用本网站任意知识产权内容，严禁用于商业盈利、侵权传播等违规用途。</p>
            <p>任何主体如需引用、转载、合作使用本网站相关内容，需提前与我司取得联系，获得书面授权并标注完整来源。经授权使用的内容，不得超出授权范围、不得篡改原意、不得用于违法违规场景。未经授权的侵权使用行为，我司将依据中、欧、北美及国际相关法律法规，依法追究其全部法律责任与经济赔偿责任。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>All original content of this website—including but not limited to texts, project cases, images, videos, visual designs, graphic logos, brand trademarks, typography layouts, audiovisual materials, design concepts, and various digital displays—is fully protected by the Copyright Law of China, EU intellectual property regulations, US copyright laws, and international intellectual property conventions.</p>
            <p>All intellectual property rights on this website—such as trademarks, brands, visual IPs, and project achievements—belong to Shanghai Ruiyi Environmental Design Co., Ltd. (RDI Lighting) or the corresponding lawful rights holders. Without formal prior written authorization from us or relevant copyright owners, no entity or individual may replicate, reprint, alter, disseminate, commercialize, create derivative works of, or use in bulk any intellectual property content of this website. It is strictly forbidden for commercial gain, infringing dissemination, or other non-compliant purposes.</p>
            <p>Any entity wishing to cite, reprint, or cooperatively use relevant content from this website must contact us in advance to obtain written authorization and attribute the complete source. Content used with authorization must not exceed the scope of authorization, must not alter the original meaning, and must not be used in illegal or non-compliant scenarios. For unauthorized infringing use, we will investigate and pursue all legal and financial liabilities in accordance with relevant laws and regulations in China, Europe, North America, and internationally.</p>
          </div>
        )
      },
      {
        title: isCN ? '四、全球通用使用规范' : 'IV. Global General Terms of Use',
        content: isCN ? (
          <div className="space-y-4">
            <p>任何用户访问、浏览、使用本网站，即视为自愿认可并完全遵守本法律声明全部条款，同时遵守用户所在属地的互联网与知识产权法律法规。若用户不认可本声明条款，请勿使用本网站任何内容与服务。</p>
            <p>如因用户违规使用本网站内容、擅自传播侵权内容、通过外部链接产生纠纷或损失，全部责任由用户自行承担，我司不承担任何连带法律责任。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>Any user who accesses, browses, or uses this website is deemed to have voluntarily acknowledged and fully complied with all terms of this Legal Statement, whilst simultaneously complying with the internet and intellectual property laws and regulations of their own jurisdiction. If a user does not agree with the terms of this statement, they should refrain from using any content and services of this website.</p>
            <p>If any dispute or loss arises from a user\'s non-compliant use of this website\'s content, unauthorized dissemination of infringing material, or through external links, all liabilities shall be borne solely by the user themselves, and we shall bear no joint or several legal liability.</p>
          </div>
        )
      },
      {
        title: isCN ? '五、条款修订与争议管辖' : 'V. Clause Amendments and Dispute Jurisdiction',
        content: isCN ? (
          <div className="space-y-4">
            <p>我司保留根据法律法规更新、业务调整、合规升级需求，随时修订本法律声明的权利，修订后将通过官网公示即时生效。</p>
            <p>因本声明及本网站使用产生的争议，优先友好协商解决。属地管辖遵循全球合规原则：中国区域适用中华人民共和国法律；欧盟区域适用欧盟及成员国属地法规；北美区域适用对应地区互联网与知识产权法律，兼顾国际通用司法准则。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p>We reserve the right to amend this Legal Statement at any time in accordance with laws and regulatory updates, business adjustments, and compliance upgrades. Such amendments shall take effect immediately upon publication on our official website.</p>
            <p>Any dispute arising from this Statement and the use of this website shall be settled through friendly consultation first. Territorial jurisdiction follows global compliance principles: disputes in the Chinese region shall be governed by the laws of the People\'s Republic of China; those in the EU region shall be governed by EU and member state local regulations; and those in the North American region shall be governed by the internet and intellectual property laws of the corresponding jurisdiction, whilst giving due consideration to general international judicial principles.</p>
          </div>
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
            {isCN ? '网站法律声明与版权保护' : 'WEBSITE LEGAL STATEMENT & COPYRIGHT'}
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
