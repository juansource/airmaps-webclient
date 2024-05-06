<template>
    <div>
        <img id="plan" src="http://localhost:3000/images/DJI_0325.JPG" style="width: 100%; max-width: 1024px;" />
    </div>
</template>

<script>
    import { Annotorious } from '@recogito/annotorious';
    import '@recogito/annotorious/dist/annotorious.min.css';

    export default {

        data() {
            return {
                anno: null
            }
        },

        methods: {
            initAnno() {
                this.anno = new Annotorious({
                    image: document.getElementById("plan")
                });

                this.anno.loadAnnotations('http://localhost:3000/testAnnotations.json?sourceImage=http://localhost:3000/images/DJI_0325.JPG');

                this.anno.on('createAnnotation', function (annotation) {
                    console.log('Created annotation', annotation);

                    var data = JSON.stringify(annotation);
                    console.log(data);
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: data
                    };
                    fetch("http://localhost:3000/testAnnotationsAdd", requestOptions)
                        .then(response => response.json())
                        .then(data => (this.postId = data.id));
                });

                this.anno.on('createSelection', function (selection) {
                    console.log('Created selection', selection);
                });

                this.anno.on('deleteAnnotation', function (annotation) {
                    console.log('Delete annotation', annotation);

                    var data = JSON.stringify(annotation);
                    console.log(data);
                    const requestOptions = {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: data
                    };
                    fetch("http://localhost:3000/testAnnotationsDelete", requestOptions)
                        .then(response => response.json())
                        .then(data => (this.postId = data.id));
                });

                this.anno.on('mouseEnterAnnotation', function (annotation, element) {
                    console.log('Mouse ENTERED annotation', annotation, element);
                });

                this.anno.on('selectAnnotation', function (annotation, element) {
                    console.log('Select annotation', annotation, element);
                });

                this.anno.on('cancelSelected', function (selection) {
                    console.log('UNSELECTED', selection);
                });

                this.anno.on('clickAnnotation', function (annotation, element) {
                    console.log('Clicked annotation', annotation, element);
                });
            }

        },

        mounted() {
            this.initAnno();
        }
    }
</script>