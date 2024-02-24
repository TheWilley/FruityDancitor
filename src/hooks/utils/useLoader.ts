export default function useLoader() {
    const openLoader = () => {
        document.getElementById('loader')?.classList.add('modal-open');
    };

    const closeLoader = () => {
        document.getElementById('loader')?.classList.remove('modal-open');
    };

    return { openLoader, closeLoader };
}