import {products} from '../../../entities/product/model/products';
import s from './ProductSelector.module.css';
export default function ProductSelector({selected,onSelect}){return <div className={s.options} aria-label="Versão do produto">{products.map(p=><button type="button" key={p.id} aria-pressed={selected===p.id} onClick={()=>onSelect(p.id)} className={selected===p.id?s.active:''}><span style={{background:p.color}}/>{p.name.replace('CHAP ','')}</button>)}</div>}
