//#region [ Import React ]
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IProduct } from '../types/IProduct';
import { GetProductsAsync } from '../types/GetProducts';
import { CircularProgress } from '@material-ui/core';
import { Product } from '../components/Product';
//#endregion

//#region [ View props & State ]
export interface IProps { }
enum RenderStates {
    WAITING = "WAITING",
    ERROR = "ERROR",
    SHOWING = "SHOWING"
}
export interface IState {
    renderState: RenderStates;
    products: IProduct[];
}
//#endregion

export class IndexView extends React.Component<IProps, IState>{

    //#region [ constructor ]
    constructor(props: IProps) {
        super(props);
        this.state = {
            renderState: RenderStates.WAITING,
            products: []
        }
    }
    //#endregion

    //#region [ react ]
    async componentDidMount() {
        try {
            let products: IProduct[] = await GetProductsAsync();
            this.setState({
                renderState: RenderStates.SHOWING,
                products: products
            })
        } catch (err) {
            this.setState({ renderState: RenderStates.ERROR, })
        }

    }
    render() {
        let { renderState, products } = this.state;
        let content: JSX.Element;
        switch (renderState) {
            case RenderStates.WAITING:
                content = (<CircularProgress color="primary" thickness={40} />);
            case RenderStates.ERROR:
                content = (<span>Error when fetching products</span>);
            case RenderStates.SHOWING:
                content = (<div className="products-container flex h-container items between wrap">
                    {products.map((p, i) =>
                        <Product
                            key={`product-${i}`}
                            product={p}
                            size={i == 3 ? "big" : "small"}
                        />
                    )}
                </div>);
        }
        return <div className="full flex v-container items v-center h-center">
            {content}
        </div>;
    }
    //#endregion
}