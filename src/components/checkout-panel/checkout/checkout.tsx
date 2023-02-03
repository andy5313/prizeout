import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { Button, GiftCard } from '../../common';
import { v4 as uuid_v4 } from 'uuid';
import { useAppSelector } from '../../../hooks';
import { selectCurrentOffer } from '../../../slices/offers-slice';
import './checkout.less';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const { name, image_url, giftcard_list } = useAppSelector(selectCurrentOffer) || {};

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">Display Gift Card Here</section>
                    {name && <GiftCard altText={name} imgUrl={image_url} name={name} />}
                </div>
                {giftcard_list && <p>Select Redemption Value</p>}
                <div className="grid grid--four-columns">
                    {giftcard_list &&
                        giftcard_list.map((card) => (
                            <Button
                                className="grid__item"
                                size="small"
                                ariaLabel="dsads"
                                text={String(card.cost_in_cents)}
                                key={uuid_v4()}
                            />
                        ))}
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
