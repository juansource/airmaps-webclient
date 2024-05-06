
<template>
    <div class="card flex justify-content-center">
        <Galleria v-model:visible="displayBasic" :value="images" :responsiveOptions="responsiveOptions" :numVisible="9" containerStyle="max-width: 1024px" :circular="true" :fullScreen="true" :showItemNavigators="true">
            <template #item="slotProps">
                <button @click="prevPhoto">Previous</button>
                <img id="plan" :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block" />
                <button @click="nextPhoto">Next</button>
            </template>
            <template #thumbnail="slotProps">
                <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" style="max-height: 100px; width: 100%; display: block" />
            </template>
        </Galleria>

        <button @click="displayBasic = true">Open Gallery</button>
    </div>
</template>

<script setup>
    import { ref, onMounted } from "vue";
    import Galleria from 'primevue/galleria';
    import { Annotorious } from '@recogito/annotorious';
    import '@recogito/annotorious/dist/annotorious.min.css';

    const images = ref();
    const responsiveOptions = ref([
        {
            breakpoint: '1500px',
            numVisible: 5
        },
        {
            breakpoint: '1024px',
            numVisible: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ]);
    var anno = null;
    var photoIndex = 0;
    var projectId = "";


    const initAnno = () => {
        displayBasic = true;
        if(anno != null){
            anno.destroy();
            anno = null;
        }

        anno = new Annotorious({
            image: document.getElementById("plan")
        });

        anno.loadAnnotations('http://localhost:3000/Annotations?sourceImage=' + images.value[photoIndex].itemImageSrc + '&projectId=' + projectId);

        anno.on('createAnnotation', function (annotation) {
            console.log('Created annotation', annotation);

            var data = JSON.stringify(annotation);
            console.log(data);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data
            };
            fetch("http://localhost:3000/AnnotationsAdd?projectId=" + projectId, requestOptions)
                .then(response => response.json())
                .then(data => (this.postId = data.id));
        });

        anno.on('createSelection', function (selection) {
            console.log('Created selection', selection);
        });

        anno.on('deleteAnnotation', function (annotation) {
            console.log('Delete annotation', annotation);

            var data = JSON.stringify(annotation);
            console.log(data);
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data
            };
            fetch("http://localhost:3000/AnnotationsDelete?projectId=" + projectId, requestOptions)
                .then(response => response.json())
                .then(data => (this.postId = data.id));
        });

        anno.on('mouseEnterAnnotation', function (annotation, element) {
            console.log('Mouse ENTERED annotation', annotation, element);
        });

        anno.on('selectAnnotation', function (annotation, element) {
            console.log('Select annotation', annotation, element);
        });

        anno.on('cancelSelected', function (selection) {
            console.log('UNSELECTED', selection);
        });

        anno.on('clickAnnotation', function (annotation, element) {
           console.log('Clicked annotation', annotation, element);
        });
    };
    const prevPhoto = () => {
        photoIndex = photoIndex - 1;
        if(photoIndex < 0) {
            photoIndex = images.value.length - 1;
        }
        var img = document.getElementById("plan");
        img.src = images.value[photoIndex].itemImageSrc;
        initAnno();
    };
    const nextPhoto = () => {
        photoIndex = photoIndex + 1;
        if(photoIndex >= images.value.length) {
            photoIndex = 0;
        }
        var img = document.getElementById("plan");
        img.src = images.value[photoIndex].itemImageSrc;
        initAnno();
    };

    var displayBasic = ref(false);

    onMounted(() => {
        const requestOptions = {
            method: "GET"
        };
        fetch("http://localhost:3000/GalleryImages?projectId=" + projectId, requestOptions)
            .then(response => response.json())
            .then((data) => (images.value = data));
    })
</script>

