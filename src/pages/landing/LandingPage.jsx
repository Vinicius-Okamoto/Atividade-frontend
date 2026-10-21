import {useState} from 'react';
import Header from '../../widgets/header/Header';
import Hero from '../../widgets/hero/Hero';
import {ProductIntro,Benefits,HowItWorks,Collection,Testimonials,Purchase,FAQ,Footer} from '../../widgets/content/Content';
import PurchaseModal from '../../features/simulate-purchase/ui/PurchaseModal';
import {products,kitPrice} from '../../entities/product/model/products';
import s from './LandingPage.module.css';
export default function LandingPage(){const[selected,setSelected]=useState('original');const[offer,setOffer]=useState(null);const product=products.find(p=>p.id===selected);return <><a className={s.skip} href="#conteudo">Pular para o conteúdo</a><Header/><main id="conteudo"><Hero/><ProductIntro/><Benefits/><HowItWorks/><Collection selected={selected} onSelect={setSelected}/><Testimonials/><Purchase selected={selected} onSelect={setSelected} onPurchase={setOffer}/><FAQ/></main><Footer/>{offer&&<PurchaseModal product={product} offer={offer} price={offer==='kit'?kitPrice:product.price} onClose={()=>setOffer(null)}/>}</>}
