import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:1906"
})

export const getHeader = () => {
    const token = localStorage.getItem("token")
    return {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
    }
}

/* This function adds a new house  to the database */
export async function addHouse(photo, houseType, housePrice, houseRoom, houseBathroom, houseSurface, houseCountry, houseAddress, houseYear, houseDescription) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("houseType", houseType)
    formData.append("housePrice", housePrice)
    formData.append("houseRoom", houseRoom)
    formData.append("houseBathroom", houseBathroom)
    formData.append("houseSurface", houseSurface)
    formData.append("houseCountry", houseCountry)
    formData.append("houseAddress", houseAddress)
    formData.append("houseYear", houseYear)
    formData.append("houseDescription", houseDescription)

    const response = await api.post("/houses/add/new-house", formData, {
        headers: getHeader()
    })
    if (response.status === 201) {
        return true
    } else {
        return false
    }
}

/* This function gets all house types from the database */
export async function getHouseTypes() {
    try {
        const response = await api.get("/houses/house/types")
        return response.data
    } catch (error) {
        throw new Error("Error fetching house types")
    }
}

/* This function gets all rooms from the database */
export async function getAllHouses() {
    try {
        const result = await api.get("/house/all-houses")
        return result.data
    } catch (error) {
        throw new Error("Error fetching houses")
    }
}

/* This function deletes a house by the ID */
export async function deleteHouse(houseId) {
    try {
        const result = await api.delete(`/houses/delete/house/${houseId}`, {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error deleting house ${error.message}`)
    }
}

/* This function update a house */
export async function updateHouse(houseId, photo, houseType, housePrice, houseRoom, houseBathroom, houseSurface, houseCountry, houseAddress, houseYear, houseDescription) {
    const formData = new FormData()
    formData.append("photo", photo)
    formData.append("houseType", houseType)
    formData.append("housePrice", housePrice)
    formData.append("houseRoom", houseRoom)
    formData.append("houseBathroom", houseBathroom)
    formData.append("houseSurface", houseSurface)
    formData.append("houseCountry", houseCountry)
    formData.append("houseAddress", houseAddress)
    formData.append("houseYear", houseYear)
    formData.append("houseDescription", houseDescription)
    const response = await api.put(`/house/update/${houseId}`, formData, {
        headers: getHeader()
    })
    return response
}

/* This function gets a house by the id */
export async function getHouseById(roomId) {
    try {
        const result = await api.get(`/house/house/${roomId}`)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching room ${error.message}`)
    }
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
    try {
        const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
        return response.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error booking room : ${error.message}`)
        }
    }
}

/* This function gets alll bokings from the database */
export async function getAllBookings() {
    try {
        const result = await api.get("/bookings/all-bookings", {
            headers: getHeader()
        })
        return result.data
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

/* This function get booking by the cnfirmation code */
export async function getBookingByConfirmationCode(confirmationCode) {
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`)
        return result.data
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`Error find booking : ${error.message}`)
        }
    }
}

/* This is the function to cancel user booking */
export async function cancelBooking(bookingId) {
    try {
        const result = await api.delete(`/bookings/booking/${bookingId}/delete`)
        return result.data
    } catch (error) {
        throw new Error(`Error cancelling booking :${error.message}`)
    }
}

/* This function gets all availavle rooms from the database with a given date and a house type */
export async function getAvailableRooms(checkInDate, checkOutDate, roomType) {
    const result = await api.get(
        `rooms/available-rooms?checkInDate=${checkInDate}
		&checkOutDate=${checkOutDate}&roomType=${roomType}`
    )
    return result
}

/* This function register a new user */
export async function registerUser(registration) {
    try {
        const response = await api.post("/auth/register-user", registration)
        return response.data
    } catch (error) {
        if (error.reeponse && error.response.data) {
            throw new Error(error.response.data)
        } else {
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}

/* This function login a registered user */
export async function loginUser(login) {
    try {
        const response = await api.post("/auth/login", login)
        if (response.status >= 200 && response.status < 300) {
            return response.data
        } else {
            return null
        }
    } catch (error) {
        console.error(error)
        return null
    }
}

/*  This is function to get the user profile */
export async function getUserProfile(userId, token) {
    try {
        const response = await api.get(`users/profile/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* This isthe function to delete a user */
export async function deleteUser(userId) {
    try {
        const response = await api.delete(`/users/delete/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        return error.message
    }
}

/* This is the function to get a single user */
export async function getUser(userId, token) {
    try {
        const response = await api.get(`/users/${userId}`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        throw error
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId, token) {
    try {
        const response = await api.get(`/bookings/user/${userId}/bookings`, {
            headers: getHeader()
        })
        return response.data
    } catch (error) {
        console.error("Error fetching bookings:", error.message)
        throw new Error("Failed to fetch bookings")
    }
}
