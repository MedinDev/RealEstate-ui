import React, {useEffect, useState} from 'react';
import {getHouseTypes} from "../utils/ApiFunctions.js";

const HouseTypeSelector = ({handleHouseInputChange, newHouse}) => {
    const [houseTypes, setHouseTypes] = useState([""])
    const [showNewHouseTypeInput, setShowNewHouseTypeInput] = useState(false)
    const [newHouseType, setNewHouseType] = useState("")

    useEffect(() => {
        getHouseTypes().then((data) => {
            setHouseTypes(data)
        })
    }, [])

    const handleNewHouseTypeInputChange = (e) => {
        setNewHouseType(e.target.value)
    }

    const handleAddNewHouseType = () => {
        if (newHouseType !== "") {
            setHouseTypes([...houseTypes, newHouseType])
            setNewHouseType("")
            setShowNewHouseTypeInput(false)
        }
    }

    return (
        <>
            {houseTypes.length > 0 && (
                <div>
                    <select
                        required
                        className="form-select"
                        name="houseType"
                        onChange={(e) => {
                            if (e.target.value === "Add New") {
                                setShowNewHouseTypeInput(true)
                            } else {
                                handleHouseInputChange(e)
                            }
                        }}
                        value={newHouse.houseType}>
                        <option value="">Select a house type</option>
                        <option value={"Add New"}>Add New</option>
                        {houseTypes.map((type, index) => (
                            <option key={index} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                    {showNewHouseTypeInput && (
                        <div className="mt-2">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter New Home Type"
                                    value={newHouseType}
                                    onChange={handleNewHouseTypeInputChange}
                                />
                                <button className="btn btn-hotel" type="button" onClick={handleAddNewHouseType}>
                                    Add
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default HouseTypeSelector;