//#region [ Import React ]
import * as React from 'react';
import * as ReactDOM from 'react-dom';
//#endregion

import { IProduct } from '../types/IProduct';
import { Paper, Checkbox, Button } from '@material-ui/core';
import { Favorite, FavoriteBorder, KeyboardArrowRight } from '@material-ui/icons';

//#region [ Component props ]
export interface IProps {
    product: IProduct;
    size: "small" | "big"
}
export interface IState {
    isChecked: boolean;
}
//#endregion

export class Product extends React.Component<IProps, IState>{

    //#region [ default props ]
    public static defaultProps(): Partial<IProps> {
        return { size: "small" };
    }
    //#endregion

    //#region [ constructor ]
    constructor(props: IProps) {
        super(props);
        this.state = { isChecked: false };
    }
    //#endregion

    //#region [ react ]
    render() {
        let { product, size } = this.props;
        let state = this.state;
        let containerWidth = size == "small" ? 462 : 958;
        let containerHeight = size == "small" ? 301 : 492;
        let style = {
            container: { width: containerWidth, height: containerHeight },
            imageContainer: {
                background: `url(${product.image}) no-repeat 50% 50% / cover`,
            } as React.CSSProperties
        }

        return <Paper elevation={1} className="card flex v-container">
            <div className="h-full flex h-container items between card-top" style={style.imageContainer}>
                <Checkbox
                    checked={state.isChecked}
                    icon={<FavoriteBorder style={{ color: '#ffffff' }} />}
                    checkedIcon={<Favorite />}
                    onChange={(e, checked) => { this.setState({ isChecked: checked }) }}
                    className="flex item top"
                />
                <div className="flex item bottom hurry">
                    <a>Hurry up! <i className="far fa-clock"></i></a>
                </div>
            </div>
            <div className="h-full flex h-container items between card-bottom">
                <div className="flex v-container items around card-info">
                    <span><b>{product.destinationName.toUpperCase()}</b></span>
                    <span><b>{product.name}</b></span>
                    <span>{product.shortDesc}</span>
                </div>
                <div className="flex h-container items between card-actions">
                    <div className="flex item right v-container items h-center action-price">
                        <span>-{product.discount}%</span>
                        <span>{product.pricePreLabel} {product.price}€</span>
                        <span>{product.pricePostLabel}</span>
                    </div>
                    <div className="flex item right v-container items v-center h-center action-button">
                        <Button variant="fab" color="primary">
                            <KeyboardArrowRight style={{ color: '#ffffff' }} />
                        </Button>
                    </div>
                </div>
            </div>
        </Paper>;
    }
    //#endregion
}