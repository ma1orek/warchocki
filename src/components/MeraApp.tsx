import { useT } from '../lib/i18n'
export default function MeraApp(){
 const {locale}=useT();const pl=locale==='pl';
 return <section id="aplikacja" style={{padding:'72px max(6%, calc((100vw - 1200px) / 2))',background:'#101622',color:'#fff',scrollMarginTop:90}}>
 <p style={{fontSize:12,letterSpacing:'.16em',color:'#a3b6f0'}}>MERA OS</p>
 <h2 style={{fontSize:'clamp(30px, 4.2vw, 56px)',lineHeight:1.12,maxWidth:800,margin:'20px 0'}}>{pl?'Mózg Edwarda. Teraz także w Twoim telefonie.':'Edward’s brain. Now on your phone.'}</h2>
 <p style={{fontSize:18,lineHeight:1.7,color:'#bcc7da',maxWidth:720}}>{pl?'Za rozmowami Edwarda stoi system MERA OS. W aplikacji stworzysz własnego robota: nadasz mu imię, wybierzesz głos i opiszesz charakter. Potem po prostu rozmawiacie.':'Edward’s conversations run on MERA OS. Create your own robot in the app: give it a name, choose a voice and describe its personality. Then start talking.'}</p>
 <div style={{display:'flex',flexWrap:'wrap',gap:14,margin:'26px 0'}}>
 <a href="https://apps.apple.com/pl/app/mera-os/id6829454146" style={{padding:'15px 24px',borderRadius:12,background:'#c5d3ff',color:'#101622',fontWeight:700,textDecoration:'none'}}>{pl?'Pobierz w App Store':'Download on the App Store'} ↗</a>
 <a href="https://merarobotics.com/mera-home/?utm_source=warchocki&utm_medium=website&utm_campaign=app_launch" style={{padding:'15px 24px',borderRadius:12,border:'1px solid #647390',color:'#fff',textDecoration:'none'}}>{pl?'Stwórz swojego robota':'Create your robot'} ↗</a>
 </div><p style={{color:'#aebbd2',fontSize:13,lineHeight:1.7}}>{pl?'5 darmowych minut bez karty dla nowych kont, w ramach dostępnej puli. Android: dostęp przez przeglądarkę, Google Play w przygotowaniu.':'5 free minutes without a card for new accounts, subject to availability. Android: use your browser while Google Play publication is pending.'}</p>
 <a href="https://merarobotics.com/aplikacja/?utm_source=warchocki&utm_medium=website&utm_campaign=app_launch" style={{color:'#c5d3ff',textUnderlineOffset:5}}>{pl?'Poznaj MERA OS i zobacz, jak zacząć':'Explore MERA OS and learn how to start'} →</a>
 </section>
}
