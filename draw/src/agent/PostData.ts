// import React, { useState } from 'react'

// already set the proxy to http://localhost:8000 in package.json
const url="http://localhost:8000/image/" // don't forget the last "/"

export const postData = async (img2DArray: number [][]) => {

    const data = {
        'image': img2DArray
    }

    try {
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
  
        const responseData = await response.json()
        // console.log('posted data finished', responseData)
        return responseData

    } catch (error) {
        console.error('Error:', error);
        return null
    }
}
