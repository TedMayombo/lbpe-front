import React, { Component } from 'react'

const User=({match})=> { return (
<div>Welcome User {match.params.username}</div>)  }


export default User
