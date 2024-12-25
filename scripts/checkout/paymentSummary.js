
import { cart } from '../../data/cart.js'
import { products, getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrenct } from "../utils/money.js";

export function renderPaymentSummary() {
    let productPriceCents = 0;
    let shippingPriceCents = 0;
    let quantity =0;
    cart.forEach((cartItem) => {
        const product = getProduct(cartItem.productId);
        productPriceCents += product.priceCents * cartItem.quantity;
        const deliveryOption = getDeliveryOption(cartItem.deliveryOptionsId);
        shippingPriceCents += deliveryOption.priceCents;
        quantity+= cartItem.quantity;

    });

    const totalBeforeTax = productPriceCents + shippingPriceCents;
    const totalTax = totalBeforeTax * 0.1;
    const Total = totalBeforeTax + totalTax;
    const paymentSummaryHTML=`
           
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items:${quantity}</div>
            <div class="payment-summary-money">$${formatCurrenct(productPriceCents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrenct(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrenct(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrenct(totalTax)}</div>
          </div>

          <!-- Removed duplicate "Items (3): $42.75" row -->

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrenct(Total)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
        
      const totalItem =` Checkout (<a class="return-to-home-link"
            href="amazon.html">${quantity} items</a>)`
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
    document.querySelector('.js-quanlity').innerHTML = totalItem;
    
}