import React, { useState, useEffect } from 'react';
import './DetailsTab.scss';

// Libs
import { getRecipeNutrition, getRecipeIngredients, getRecipeInstruction } from '../../../store/libs/request';
import { compactNumber } from '../../../store/libs/common';

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
      <section className={"details-tab description" + isActve}>
        <p className="sum" dangerouslySetInnerHTML={{__html: props.summary}}></p>
        <div className="nutrition">
          <div className="item">
            <span className="value">{compactNumber(Number(nutrition.calories.replace('k', '')))}</span>
            <span className="type">Calories</span>
            <span className="unit">kal</span>
          </div>
          <div className="item">
            <span className="value">{compactNumber(Number(nutrition.carbs.replace('g', '')))}</span>
            <span className="type">Carbo</span>
            <span className="unit">gram</span>
          </div>
          <div className="item">
            <span className="value">{compactNumber(Number(nutrition.fat.replace('g', '')))}</span>
            <span className="type">Fat</span>
            <span className="unit">gram</span>
          </div>
          <div className="item">
            <spa className="value">{compactNumber(Number(nutrition.protein.replace('g', '')))}</spa>
            <spa className="type">Protein</spa>
            <spa className="unit">gram</spa>
          </div>
        </div>
      </section>
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
        <section className={"details-tab description" + isActve}></section>
      )
    }

    return (
      <section className={"details-tab ingredients" + isActve}>
        {ingredients.map(item => (
          <div className="item">
            <div className="image">
              <div>
                <div style={{backgroundImage: `url(https://spoonacular.com/cdn/ingredients_100x100/${item.image})`}}></div>
              </div>
            </div>
            <span className="name">
              {/* Mengubah format string menjadi huruf kapital */}
              {/* Case: "whole diced appel" => "Whole Diced Apple" */}
              {item.name.split(' ').map(str => str.replace(str[0], str[0].toUpperCase())).join(' ')}
            </span>
            <span className="amount">{item.amount.metric.value} {item.amount.metric.unit}</span>
          </div>
        ))}
      </section>
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
        <section className={"details-tab description" + isActve}></section>
      )
    }

    return (
      <section className={"details-tab instruction" + isActve}>
        {instruction.steps.map(item => (
          <div className="item">
            <span className="number">{item.number}</span>
            <span className="step">{item.step}</span>
          </div>
        ))}
      </section>
    )
  }
}

export default DetailsTab;