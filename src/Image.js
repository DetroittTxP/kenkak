import React, { useEffect} from "react";
import dicomParser  from "dicom-parser";
import cornerstone from "cornerstone-core";
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader'
import {useParams} from'react-router-dom';

cornerstoneWADOImageLoader.external.dicomParser = dicomParser;
cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
        }
    });

export default function Image() {
        const {...id} = useParams();

        useEffect(() => {
            cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
            cornerstoneWADOImageLoader.configure({
            beforeSend: function(xhr) {
            }
        });

        function loadAndViewImage(imageId) {
            var element = document.getElementById('dicomImage');
            try {
                cornerstone.loadAndCacheImage(imageId).then(function(image)
                {
                    var viewport = cornerstone.getDefaultViewportForImage(element, image);

                    cornerstone.displayImage(element, image, viewport);

                }, function(err) {
                    console.log(err);
                });
            }
            catch(err) {
                console.log(err);
            }
        }
        function downloadAndView() {
            let url =  `http://localhost:5000/download_dcm_images/${id[0]}` ;
            url = "wadouri:" + url;
            loadAndViewImage(url);
        }

        var element = document.getElementById('dicomImage'); //เอาค่ามาเก็บไว้ใน dicomImage
        cornerstone.enable(element);
        downloadAndView();

        });

    return(
        <div >
            <div id="dicomImage" style={{height: '90vh',width: '90vh'}}></div>
        </div>
        )
}
