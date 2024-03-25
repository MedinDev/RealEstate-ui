import React, {useState} from 'react';

const HouseFilter = ({data, setFilteredData}) => {
    const [filter, setFilter] = useState("")
    const handleSelectChange = (e) => {
        const selectedType = e.target.value
        setFilter(selectedType)

        const filteredHouses = data.filter((house) =>
            house.houseType.toLowerCase().includes(selectedType.toLowerCase())
        )
        setFilteredData(filteredHouses)
    }

    const clearFilter = () => {
        setFilter("")
        setFilteredData(data)
    }

    const houseTypes = ["", ...new Set(data.map((house) => house.houseType))]
    return (
        <div>
            <div className="input-group mb-3">
			<span className="input-group-text" id="room-type-filter">
				Filter house by type
			</span>
                <select
                    className="form-select"
                    aria-label="romm type filter"
                    value={filter}
                    onChange={handleSelectChange}>
                    <option value="">select a house type to filter....</option>
                    {houseTypes.map((type, index) => (
                        <option key={index} value={String(type)}>
                            {String(type)}
                        </option>
                    ))}
                </select>
                <button className="btn btn-hotel" type="button" onClick={clearFilter}>
                    Clear Filter
                </button>
            </div>
        </div>
    );
};

export default HouseFilter;