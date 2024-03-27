import React, {useEffect, useState} from 'react';
import {getHouseById, updateHouse} from "../utils/ApiFunctions.js";
import {Link, useParams} from "react-router-dom";

const EditHouse = () => {
    const [house, setHouse] = useState({
        photo: "",
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
    const {houseId} = useParams()

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0]
        setHouse({...house, photo: selectedImage})
        setImagePreview(URL.createObjectURL(selectedImage))
    }

    const handleInputChange = (event) => {
        const {name, value} = event.target
        setHouse({...house, [name]: value})
    }


    useEffect(() => {
        const fetchHouse = async () => {
            try {
                const houseData = await getHouseById(houseId)
                setHouse(houseData)
                setImagePreview(houseData.photo)
            } catch (error) {
                setErrorMessage(error.message)
            }
        }
        fetchHouse()
    }, [houseId]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await updateHouse(houseId, house)
            if (response.status === 200) {
                setSuccessMessage("Home update successfully")
                const updatedHouseData = await getHouseById(houseId)
                setHouse(updatedHouseData)
                setImagePreview(updatedHouseData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating house")
            }
        } catch (error) {
            setErrorMessage(error.message)
            setErrorMessage(error.message)
        }
    }


    return (
        <>
            <section className="container, mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Add a New Home</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}
                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="houseType" className="form-label"> Home Type</label>
                                <input type="text"
                                       className="form-control"
                                       id="houseType"
                                       name="houseType"
                                       value={house.houseType}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="housePrice" className="form-label"> Home Price</label>
                                <input type="number"
                                       className="form-control"
                                       id="housePrice"
                                       name="housePrice"
                                       value={house.housePrice}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseRoom" className="form-label"> Home Room</label>
                                <input type="number"
                                       className="form-control"
                                       id="houseRoom"
                                       name="houseRoom"
                                       value={house.houseRoom}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseBathroom" className="form-label"> Home Bathroom</label>
                                <input type="number"
                                       className="form-control"
                                       id="houseBathroom"
                                       name="houseBathroom"
                                       value={house.houseBathroom}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseSurface" className="form-label"> Home Surface</label>
                                <input type="number"
                                       className="form-control"
                                       id="houseSurface"
                                       name="houseSurface"
                                       value={house.houseSurface}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseCountry" className="form-label"> Home Country</label>
                                <input type="text"
                                       className="form-control"
                                       id="houseCountry"
                                       name="houseCountry"
                                       value={house.houseCountry}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseAddress" className="form-label"> Home Address</label>
                                <input type="text"
                                       className="form-control"
                                       id="houseAddress"
                                       name="houseAddress"
                                       value={house.houseAddress}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseYear" className="form-label"> Home Year</label>
                                <input type="date"
                                       className="form-control"
                                       id="houseYear"
                                       name="houseYear"
                                       value={house.houseYear}
                                       onChange={handleInputChange}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="houseDescription" className="form-label"> Home Description</label>
                                <textarea
                                    className="form-control"
                                    id="houseDescription"
                                    name="houseDescription"
                                    value={house.houseDescription}
                                    onChange={handleInputChange}/>
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
                                        alt="Preview Home photo"
                                        style={{maxWidth: "400px", maxHeight: "400px"}}
                                        className="mb-3"/>
                                )}
                            </div>
                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <Link to={"/existing-rooms"} className="btn btn-outline-info">
                                    back
                                </Link>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Edit Home
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditHouse;