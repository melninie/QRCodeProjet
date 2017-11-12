
function deleteItems(idItem, chemin) {
    console.log("SCRIPT");

    $.ajax({
        url: "http://localhost:8080/"+chemin+idItem,
        type: 'delete',
    });
}
