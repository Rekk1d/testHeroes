

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {v4 as uuidv4} from 'uuid';

import { useHttp } from '../../hooks/http.hook';
import { addHero } from '../../actions';

const HeroesAddForm = () => {

    const [heroName, setHeroName] = useState('')
    const [heroDescr, setHeroDescr] = useState('')    
    const [heroElem, setHeroElem] = useState('')    

    const dispatch = useDispatch()
    const {request} = useHttp()


    const addNewHero = (e) => {
        e.preventDefault();
        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElem
        }

        request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
            .then(dispatch(addHero(newHero)))
            .catch(console.log('error'))
    
        setHeroName('')
        setHeroDescr('')
        setHeroElem('')

    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={(e) => addNewHero(e)}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control"
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select"
                    value={heroElem}
                    onChange={(e) => setHeroElem(e.target.value)}
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;