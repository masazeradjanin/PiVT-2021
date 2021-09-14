import React from 'react';
import FurnitureService from '../../services/FurnitureService';
import FurnitureModel from '../../../../03-back-end/src/components/furniture/model';
import Furniture from './Furniture';
import './FurniturePage.scss';

interface FurniturePageState {
    furnitureList: FurnitureModel[]
}

export default class FurniturePage extends React.Component {
    state: FurniturePageState;

    constructor(props: any) {
        super(props);
        
        this.state = {
            furnitureList: []
        }
    }

    componentDidMount() {
        FurnitureService.getAll().then(furnitureList=>{
            if(Array.isArray(furnitureList) && furnitureList.length > 0 ) {
                this.setState({
                    furnitureList
                })
            }
        })
    }

    render() {
        return (
            <div className="furniture-page">
                {
                    this.state.furnitureList.map(furniture=>(<Furniture key={furniture.furnitureId} furniture={furniture}/>))
                }
            </div>
        )
    }
}