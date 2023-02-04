import React, { useEffect } from 'react';
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
import { useDispatch } from 'react-redux';

const CheckoutPanelView: React.FC = (): React.ReactElement => {
    const { name, image_url, giftcard_list } = useAppSelector(selectCurrentOffer) || {};
    const dispatch = useDispatch<AppDispatch>();
    const currentValueOption = useAppSelector(selectCurrentValueOption) || {};
    const { checkout_value_id, cost_in_cents, display_bonus, value_in_cents } =
        useAppSelector(selectCurrentValueOption) || {};
    const handleClick = (valueOption: PrizeoutOfferValueOptions) => {
        dispatch(setCurrentValueOption(valueOption));
        console.log(valueOption);
    };

    return (
        <section className="checkout">
            <div className="grid grid--top-bottom grid--stretch-top">
                <div className="grid__item">
                    {name && <GiftCard altText={name} imgUrl={image_url} name={name} />}
                    {giftcard_list && <h3>Select Redemption Value</h3>}

                    <div className="grid grid--four-columns">
                        {giftcard_list &&
                            giftcard_list.map((option) => (
                                <Button
                                    className="grid__item"
                                    size="small"
                                    ariaLabel="Value Options"
                                    isSelected={option === currentValueOption}
                                    text={'$' + (option.cost_in_cents / 100).toFixed(2)}
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
                </div>
                <div className="grid__item">
                    <section className="checkout__calculation">
                        <CheckoutButton
                            checkout_value_id={checkout_value_id}
                            cost_in_cents={cost_in_cents}
                            name={name}
                            value_in_cents={value_in_cents}
                        />
                    </section>
                </div>
            </div>
        </section>
    );
};

export default checkoutPanelViewWrapper(CheckoutPanelView, 'checkout');
