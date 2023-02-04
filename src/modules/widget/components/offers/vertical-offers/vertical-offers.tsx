import React, { useEffect } from 'react';
import Classnames from 'classnames';
import {
    PrizeoutOffer,
    PrizeoutOfferSettings,
    setCurrentOffer,
    selectCurrentOffer,
    setCurrentValueOption,
} from '../../../../../slices/offers-slice';
import { OfferGiftCard } from '../offer-gift-card/offer-gift-card';
import { useAppSelector } from '../../../../../hooks';
import { selectIsCheckoutPanelCollapsed } from '../../../../../slices/common-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../../store';
import { toggleIsCollapsedCheckoutPanelOpen } from '../../../../../slices/checkout-slice';
import './vertical-offers.less';

interface OfferView {
    offers: PrizeoutOffer[];
    viewSettings?: PrizeoutOfferSettings;
}

const VerticalOffers: React.FC<OfferView> = ({ offers, viewSettings }): React.ReactElement => {
    const isCheckoutPanelCollapsedView = useAppSelector(selectIsCheckoutPanelCollapsed);
    const currentOffer = useAppSelector(selectCurrentOffer);
    const heading = viewSettings.title || 'Recommended for you';
    const classes: string = Classnames('vertical-offers');
    const dispatch = useDispatch<AppDispatch>();

    //useEffect for clearing the value options box whenever the current offer changes
    useEffect(() => {
        dispatch(
            setCurrentValueOption({
                checkout_value_id: '',
                cost_in_cents: null,
                display_bonus: null,
                display_monetary_bonus: null,
                value_in_cents: null,
            }),
        );
    }, [currentOffer]);

    const offerClickHandler = (offer: PrizeoutOffer) => {
        dispatch(setCurrentOffer(offer));
        if (isCheckoutPanelCollapsedView) {
            dispatch(toggleIsCollapsedCheckoutPanelOpen());
        }
    };

    const returnOffers = () => {
        return offers.map((offer) => (
            <OfferGiftCard
                key={`${heading}-${offer.name}`}
                offer={offer}
                onClickHandler={() => offerClickHandler(offer)}
            />
        ));
    };

    return (
        <div className={classes}>
            <h2>{heading}</h2>
            {offers && <div className="vertical-offers__gift-cards">{returnOffers()}</div>}
        </div>
    );
};

export default VerticalOffers;
