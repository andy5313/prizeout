import React from 'react';
import checkoutPanelViewWrapper from '../view-wrapper';
import CheckoutButton from './checkout-button';
import { Button, GiftCard } from '../../common';
import { v4 as uuid_v4 } from 'uuid';
import { useAppSelector } from '../../../hooks';
import {
    selectCurrentOffer,
    selectCurrentValueOption,
    PrizeoutOfferValueOptions,
    setCurrentValueOption,
} from '../../../slices/offers-slice';
import './checkout.less';
import OptionBonus from './option-bonus';
import { AppDispatch } from '../../../store';
import { selectCheckoutValueId } from '../../../slices/checkout-slice';
import { useDispatch } from 'react-redux';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const { name, image_url, giftcard_list } = useAppSelector(selectCurrentOffer) || {};
    const dispatch = useDispatch<AppDispatch>();
    const checkoutValueId = useAppSelector(selectCheckoutValueId) || null;
    const { checkout_value_id, cost_in_cents, display_bonus, value_in_cents } =
        useAppSelector(selectCurrentValueOption) || {};
    // const handleClick = (checkoutValueId: string) => {
    //     dispatch(setCheckoutValueId(checkoutValueId));
    //     console.log(checkoutValueId);
    // }

    const handleClick = (valueOption: PrizeoutOfferValueOptions) => {
        dispatch(setCurrentValueOption(valueOption));
        console.log(valueOption);
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    <section className="checkout__brand">Display Gift Card Here</section>
                    {name && <GiftCard altText={name} imgUrl={image_url} name={name} />}
                </div>
                {giftcard_list && <h4>Select Redemption Value</h4>}
                <div className="grid grid--four-columns">
                    {giftcard_list &&
                        giftcard_list.map((option) => (
                            <Button
                                className="grid__item"
                                size="small"
                                ariaLabel="dsads"
                                isSelected={option.checkout_value_id === checkoutValueId}
                                text={(option.cost_in_cents / 100).toFixed(2)}
                                key={uuid_v4()}
                                onClick={() => {
                                    handleClick(option);
                                }}
                            />
                        ))}
                </div>
                {checkout_value_id && (
                    <OptionBonus
                        redemptionVal={cost_in_cents / 100}
                        bonus={display_bonus}
                        totalVal={value_in_cents / 100}
                    />
                )}

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
