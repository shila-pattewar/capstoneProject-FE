import React, { useState } from 'react';
export default function ProductForm() {

  
  return (
    <form>
      <label>Name:</label>
      <input type="text" />
      <br />
      <label>Photo URI:</label>
      <input type="file"  />
      <br />
      <label>Price:</label>
      <input type="text" />
      <br />
      <label>Ingredients:</label>
      <input type="text" />
      <br />
      
      <button type="submit">Create Product</button>
    </form>
  );
}
