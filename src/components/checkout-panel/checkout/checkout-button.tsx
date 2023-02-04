import React from 'react';
import { Button } from '../../common';

interface CheckoutButtonProps {
    checkout_value_id?: string;
    cost_in_cents?: number;
    name?: string;
    value_in_cents?: number;
}

const CheckoutButton: React.FC<CheckoutButtonProps> = ({
    checkout_value_id,
    cost_in_cents,
    name,
    value_in_cents,
}): React.ReactElement => {
    const buttonText = 'Prizeout Gift Card';
    const reqBody = JSON.stringify({
        checkout_value_id: checkout_value_id,
        cost_in_cents: cost_in_cents,
        name: name,
        value_in_cents: value_in_cents,
    });

    const handleCheckout = async () => {
        if (checkout_value_id) {
            await fetch('https://pinwheel/api/giftcard/', {
                body: reqBody,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                method: 'POST',
            })
                .then((response) => console.log('Fetch success', response))
                .catch((error) => {
                    console.log(reqBody);
                    console.log(error.message);
                });
        }
    };

    return (
        <>
            <Button
                ariaLabel="Prizeout your gift card"
                color={`primary`}
                onClick={handleCheckout}
                size="medium"
                text={buttonText}
                type="submit"
            />
        </>
    );
};

export default CheckoutButton;
