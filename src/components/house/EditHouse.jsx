import React, {useEffect, useState} from "react"
import {getHouseById, updateHouse} from "../utils/ApiFunctions"
import {Link, useParams} from "react-router-dom"

const EditHouse = () => {
    const [house, setHouse] = useState({
        photo: "", houseType: "",
        housePrice: "", houseRoom: "",
        houseBathroom: "", houseSurface: "",
        houseCountry: "", houseAddress: "",
        houseYear: "", houseDescription: ""
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
                console.error(error)
            }
        }

        fetchHouse()
    }, [houseId])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const response = await updateHouse(houseId, house)
            if (response.status === 200) {
                setSuccessMessage("House updated successfully!")
                const updatedHouseData = await getHouseById(houseId)
                setHouse(updatedHouseData)
                setImagePreview(updatedHouseData.photo)
                setErrorMessage("")
            } else {
                setErrorMessage("Error updating house")
            }
        } catch (error) {
            console.error(error)
            setErrorMessage(error.message)
        }
    }

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit House</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {successMessage && (
                        <div className="alert alert-success" role="alert">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="houseType" className="form-label hotel-color">
                                House Type
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="houseType"
                                name="houseType"
                                value={house.houseType}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="housePrice" className="form-label hotel-color">
                                house rent
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="housePrice"
                                name="housePrice"
                                value={house.housePrice}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseRoom" className="form-label hotel-color">
                                House
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="houseRoom"
                                name="houseRoom"
                                value={house.houseRoom}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseBathroom" className="form-label hotel-color">
                                Bathroom
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="houseBathroom"
                                name="houseBathroom"
                                value={house.houseBathroom}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseSurface" className="form-label hotel-color">
                                Surface (m²)
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="houseSurface"
                                name="houseSurface"
                                value={house.houseSurface}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseCountry" className="form-label hotel-color">
                                Country
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="houseCountry"
                                name="houseCountry"
                                value={house.houseCountry}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseAddress" className="form-label hotel-color">
                                Address
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="houseAddress"
                                name="houseAddress"
                                value={house.houseAddress}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseYear" className="form-label hotel-color">
                                Year of construction
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="houseYear"
                                name="houseYear"
                                value={house.houseYear}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="houseDescription" className="form-label hotel-color">
                                Description of the house
                            </label>
                            <input
                                type="number"
                                className="form-control"
                                id="houseDescription"
                                name="houseDescription"
                                value={house.houseDescription}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label hotel-color">
                                Photo
                            </label>
                            <input
                                required
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={handleImageChange}
                            />
                            {imagePreview && (
                                <img
                                    src={`data:image/jpeg;base64,${imagePreview}`}
                                    alt="House preview"
                                    style={{maxWidth: "400px", maxHeight: "400"}}
                                    className="mt-3"
                                />
                            )}
                        </div>
                        <div className="d-grid gap-2 d-md-flex mt-2">
                            <Link to={"/existing-rooms"} className="btn btn-outline-info ml-5">
                                back
                            </Link>
                            <button type="submit" className="btn btn-outline-warning">
                                Edit House
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default EditHouse
