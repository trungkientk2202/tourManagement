import React from 'react';

const Challan = () => {
    return (
        <div>
            <div>Challan</div>
            <form method="post" enctype="multipart/form-data" action="http://localhost:8000/api/image-video/upload">
                <input type="file" name="file" />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default Challan;
