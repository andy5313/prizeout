import React from 'react';
import './option-bonus.less';

interface OptionBonusProps {
    redemptionVal?: number;
    bonus?: number;
    totalVal?: number;
}

const OptionBonus: React.FC<OptionBonusProps> = ({ redemptionVal, bonus, totalVal }): React.ReactElement => {
    return (
        <div className="option-bonus">
            <div className="option-bonus-properties">
                <h4>Redemption Value</h4>
                <h4>${redemptionVal.toFixed(2)}</h4>
            </div>
            <div className="option-bonus-properties blue-text">
                <h4>Prizeout Bonus (+{bonus}%)</h4>
                <h4>${((redemptionVal / 100) * bonus).toFixed(2)}</h4>
            </div>
            <div className="option-bonus-properties">
                <h4>You Get</h4>
                <h4>${totalVal.toFixed(2)}</h4>
            </div>
        </div>
    );
};

export default OptionBonus;
