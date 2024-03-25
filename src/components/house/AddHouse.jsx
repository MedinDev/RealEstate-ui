import React, {useState} from 'react';
import {addHouse} from "../utils/ApiFunctions.js";
import HouseTypeSelector from "../common/HouseTypeSelector.jsx";

const AddHouse = () => {
    const [newHouse, setNewHouse] = useState({
        photo: null,
        houseType: "",
        housePrice: "",
        houseRoom: "",
        houseBathroom: "",
        houseSurface: "",
        houseCountry: "",
        houseAddress: "",
        houseYear: "",
        houseDescription: ""
    })

    const [imagePreview, setImagePreview] = useState("")
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    const handleHouseInputChange = (e) => {
        const name = e.target.name
        let value = e.target.value
        if (name === "housePrice") {
            if (isNaN(value)) {
                value.parseInt(value)
            } else {
                value = ""
            }
        }
        setNewHouse({...newHouse, [name]: value})
    }
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setNewHouse({...newHouse, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const success = await addHouse(
                newHouse.photo,
                newHouse.houseType,
                newHouse.housePrice,
                newHouse.houseRoom,
                newHouse.houseBathroom,
                newHouse.houseSurface,
                newHouse.houseCountry,
                newHouse.houseAddress,
                newHouse.houseYear,
                newHouse.houseDescription)
            if (success !== undefined) {
                setSuccessMessage("House added successfully")
                setNewHouse({
                    photo: null,
                    houseType: "",
                    housePrice: "",
                    houseRoom: "",
                    houseBathroom: "",
                    houseSurface: "",
                    houseCountry: "",
                    houseAddress: "",
                    houseYear: "",
                    houseDescription: ""
                })
                setImagePreview("")
                setErrorMessage("")
            } else {
                setErrorMessage("Error adding house")
            }
        } catch (error) {
            setErrorMessage(error.message)
        }
    }
    return (
        <>
            <section className="container, mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New House</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}
                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="houseType" className="form-label"> House Type</label>
                                <div>
                                    <HouseTypeSelector handleHouseInputChange={handleHouseInputChange}
                                                       newHouse={newHouse}/>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="housePrice" className="form-label"> House Price</label>
                                <input type="number"
                                       className="form-control"
                                       id="housePrice"
                                       name="housePrice"
                                       value={newHouse.housePrice}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseRoom" className="form-label"> House Room</label>
                                <input type="number"
                                       className="form-control"
                                       id="houseRoom"
                                       name="houseRoom"
                                       value={newHouse.houseRoom}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseBathroom" className="form-label"> House Bathroom</label>
                                <input type="number"
                                       className="form-control"
                                       id="houseBathroom"
                                       name="houseBathroom"
                                       value={newHouse.houseBathroom}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseSurface" className="form-label"> House Surface</label>
                                <input type="number"
                                       className="form-control"
                                       id="houseSurface"
                                       name="houseSurface"
                                       value={newHouse.houseSurface}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseCountry" className="form-label"> House Country</label>
                                <input type="text"
                                       className="form-control"
                                       id="houseCountry"
                                       name="houseCountry"
                                       value={newHouse.houseCountry}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseAddress" className="form-label"> House Address</label>
                                <input type="text"
                                       className="form-control"
                                       id="houseAddress"
                                       name="houseAddress"
                                       value={newHouse.houseAddress}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseYear" className="form-label"> House Year</label>
                                <input type="date"
                                       className="form-control"
                                       id="houseYear"
                                       name="houseYear"
                                       value={newHouse.houseYear}
                                       onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseDescription" className="form-label"> House Description</label>
                                <textarea
                                    className="form-control"
                                    id="houseDescription"
                                    name="houseDescription"
                                    value={newHouse.houseDescription}
                                    onChange={handleHouseInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="photo" className="form-label">
                                    Photo
                                </label>
                                <input
                                    required
                                    name="photo"
                                    id="photo"
                                    type="file"
                                    className="form-control"
                                    onChange={handleImageChange}
                                />
                                {imagePreview && (
                                    <img
                                        src={imagePreview}
                                        alt="Preview  room photo"
                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                        className="mb-3"></img>
                                )}
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                {/*<Link to={"/existing-rooms"} className="btn btn-outline-info">*/}
                                {/*    Existing rooms*/}
                                {/*</Link>*/}
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save House
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default AddHouse;