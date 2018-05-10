new Vue({
    el: '#crud',
    created: function(){
        this.getKeeps();
    },
    data: {
        keeps: [],
        newKeep: '',
        fillKeep: {
            id:'',
            keep:''
        },
        errors: [],
    },
    methods: {
        getKeeps: function(){
            var urlKeeps='tasks';
            axios.get(urlKeeps).then(response => {
                this.keeps = response.data
            })
        },
        editKeep: function(keep){
            this.fillKeep.id = keep.id;
            this.fillKeep.keep = keep.keep;
            $('#edit').modal('show');
        },
        deleteKeep: function(keep) {
            var url='tasks/'+keep.id;
            axios.delete(url).then(response => {
                this.getKeeps();
                toastr.success('Eliminado correctamente');
            });
            
        },
        createKeep: function() {
            var url = 'tasks';
            axios.post(url, {
                keep: this.newKeep
            }).then(response => {
                this.getKeeps();
                this.newKeep= '';
                this.errors = [];
                $('#create').modal('hide');
                toastr.success('Creado satisfactoriamente');
            }).catch(error=> {
                this.errors = error.response.data;
            });
        },
        updateKeep: function (id) {
            var url = 'tasks/'+id;
            axios.put(url, this.fillKeep).then(response => {
                this.getKeeps();
                this.fillKeep = {
                    id:'',
                    keep:''
                };
                this.errors = [];
                $('#edit').modal('hide');
                toastr.success('Actualizado satisfactoriamente');
            }).catch(error=> {
                this.errors = error.response.data;
            });
        }
    }

});