
$(".project-row").click((event) => {
    const xebian = $('.xebian');
    const { target } = event;
    target.append(xebian[0]);
});