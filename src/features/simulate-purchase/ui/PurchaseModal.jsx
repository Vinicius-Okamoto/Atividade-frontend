import {useEffect,useRef,useState} from 'react';
import {formatCurrency} from '../../../shared/lib/formatCurrency';
import s from './PurchaseModal.module.css';

// Utility to get focusable elements inside a container
const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function PurchaseModal({product,offer,price,onClose}){
  const dialog = useRef(null);
  const [success,setSuccess] = useState(false);

  useEffect(()=>{
    const element = dialog.current;
    if (!element) return;

    // capture the element that triggered the dialog so we can restore focus
    const trigger = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // show the dialog and move focus into the first focusable element
    element.showModal();
    // ensure focus moves into the dialog (prefer the close button)
    const focusFirst = () => {
      const first = element.querySelector(FOCUSABLE_SELECTOR);
      if (first) first.focus();
      else element.focus();
    };
    // schedule to allow the browser to render the dialog
    const t = setTimeout(focusFirst, 0);

    // focus trap: keep Tab navigation inside the dialog
    const onKeyDown = (e) => {
      if (e.key !== 'Tab') return;
      const nodes = Array.from(element.querySelectorAll(FOCUSABLE_SELECTOR)).filter(n => !!(n.offsetWidth || n.offsetHeight || n.getClientRects().length));
      if (nodes.length === 0) {
        e.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    };

    element.addEventListener('keydown', onKeyDown);

    return ()=>{
      clearTimeout(t);
      element.removeEventListener('keydown', onKeyDown);
      try { element.close(); } catch (err) {}
      document.body.style.overflow = previousOverflow;
      // restore focus to the triggering element
      try { trigger?.focus(); } catch (err) {}
    };
  },[]);

  return (
    <dialog
      ref={dialog}
      className={s.dialog}
      aria-modal="true"
      aria-labelledby="order-title"
      onCancel={e=>{e.preventDefault();onClose()}}
      onClick={e=>{if(e.target===e.currentTarget){const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)onClose()}}}
    >
      <button className={s.close} onClick={onClose} aria-label="Fechar pedido">×</button>
      <span className={s.label}>SIMULAÇÃO ACADÊMICA</span>
      <h2 id="order-title">{success?'TUDO CERTO.':'SUA ESCOLHA. SUA ATITUDE.'}</h2>
      {success ? (
        <>
          <p role="status">Pedido demonstrativo registrado nesta tela. Nenhuma compra foi realizada.</p>
          <button className={s.primary} onClick={onClose}>Continuar explorando ↗</button>
        </>
      ) : (
        <>
          <p>{offer==='kit' ? 'Kit com 3 versões — Original, Urban e Energy' : product.name}</p>
          <strong>{formatCurrency(price)}</strong>
          <p className={s.note}>Valor ilustrativo. Não há venda real, cobrança ou envio. Nenhum dado pessoal é solicitado ou armazenado.</p>
          <button className={s.primary} onClick={()=>setSuccess(true)}>Confirmar pedido fictício ↗</button>
        </>
      )}
    </dialog>
  );
}
