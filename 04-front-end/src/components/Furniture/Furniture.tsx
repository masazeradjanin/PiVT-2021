import React from 'react';
import FurnitureModel from '../../../../03-back-end/src/components/furniture/model';


interface FurnitureProperties {
    furniture: FurnitureModel
}

export default class Furniture extends React.Component<FurnitureProperties> {
    constructor(props: FurnitureProperties) {
        super(props);
    }
    render() {
        return (
            <div className="furniture">
               <h3>{this.props.furniture.title}</h3>
               <strong>{this.props.furniture.currentPrice}</strong>
               <p><strong>Color: </strong>{this.props.furniture.color}</p>
               <p><strong>Material: </strong>{this.props.furniture.material}</p>
               <p><strong>Description: </strong>{this.props.furniture.description}</p>
            </div>
        )
    }
}