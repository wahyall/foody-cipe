import React, { useState, useEffect } from 'react';
import './DetailsTab.scss';

// Libs
import { getRecipeNutrition, getRecipeIngredients, getRecipeInstruction } from '../../../store/libs';

const DetailsTab = {
  Description: (props) => {
    const [nutrition, setNutrition] = useState();
    const isActve = "Description" === props.activeTab ? " active" : "";
    useEffect(async () => {
      setNutrition(await getRecipeNutrition(props.id))
    }, []);

    // Jika "nutrition" belum memiliki isi / undefined
    if (!nutrition) {
      return (
        <div className={"details-tab description" + isActve}></div>
      )
    }
    
    return (
      <div className={"details-tab description" + isActve}>
        <div className="sum" dangerouslySetInnerHTML={{__html: props.summary}}></div>
        <div className="nutrition">
          <div className="item">
            <div className="value">{nutrition.calories.replace('k', '')}</div>
            <div className="type">Calories</div>
            <div className="unit">kkal</div>
          </div>
          <div className="item">
            <div className="value">{nutrition.carbs.replace('g', '')}</div>
            <div className="type">Carbo</div>
            <div className="unit">gram</div>
          </div>
          <div className="item">
            <div className="value">{nutrition.fat.replace('g', '')}</div>
            <div className="type">Fat</div>
            <div className="unit">gram</div>
          </div>
          <div className="item">
            <div className="value">{nutrition.protein.replace('g', '')}</div>
            <div className="type">Protein</div>
            <div className="unit">gram</div>
          </div>
        </div>
      </div>
    )
  },
  Ingredients: (props) => {
    const [ingredients, setIngredients] = useState();
    const isActve = "Ingredients" === props.activeTab ? " active" : "";
    useEffect(async () => {
      setIngredients(await getRecipeIngredients(props.id))
    }, []);

    // Jika "ingredients" belum memiliki isi / undefined
    if (!ingredients) {
      return (
        <div className={"details-tab description" + isActve}></div>
      )
    }

    return (
      <div className={"details-tab ingredients" + isActve}>
        {ingredients.map(item => (
          <div className="item">
            <div className="image">
              <div>
                <div style={{backgroundImage: `url(https://spoonacular.com/cdn/ingredients_100x100/${item.image})`}}></div>
              </div>
            </div>
            <div className="name">
              {/* Mengubah format string menjadi huruf kapital */}
              {/* Case: "whole diced appel" => "Whole Diced Apple" */}
              {item.name.split(' ').map(str => str.replace(str[0], str[0].toUpperCase())).join(' ')}
            </div>
            <div className="amount">{item.amount.metric.value} {item.amount.metric.unit}</div>
          </div>
        ))}
      </div>
    )
  },
  Instruction: (props) => {
    const [instruction, setInstruction] = useState();
    const isActve = "Instruction" === props.activeTab ? " active" : "";
    useEffect(async () => {
      setInstruction(await getRecipeInstruction(props.id))
    }, []);

    // Jika "instruction" belum memiliki isi / undefined
    if (!instruction) {
      return (
        <div className={"details-tab description" + isActve}></div>
      )
    }

    return (
      <div className={"details-tab instruction" + isActve}>
        {instruction.steps.map(item => (
          <div className="item">
            <div className="number">{item.number}</div>
            <div className="step">{item.step}</div>
          </div>
        ))}
      </div>
    )
  }
}

export default DetailsTab;