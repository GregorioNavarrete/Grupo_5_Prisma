import avatar from '../assets/img/sniper.jpg'
import trolls2 from '../assets/img/banner.jpg'
import avatar2 from '../assets/img/avatar.jpg'
import john from '../assets/img/john-wick.jpg'
import sayen from '../assets/img/sayen.jpg'
import shazam from '../assets/img/shazan.jpg'
import elephant from '../assets/img/the-magicians-elephant.jpg'

export default function estrenos(){
return(
<section className="content">
<h2>Próximos estrenos</h2>
<table className="table shadow p-3 mb-5 bg-body-tertiary rounded">
    <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Titulo</th>
            <th scope="col">Director</th>
            <th scope="col">Fecha de estreno</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="row">1</th>
            <td>SUPER MARIO BROS</td>
            <td> Aaron Horvath</td>
            <td>09 ABR. 2023</td>
        </tr>
        <tr>
            <th scope="row">2</th>
            <td>PONYO Y EL SECRETO DE LA SIRENITA </td>
            <td>Dan Fontain</td>
            <td>11 MAY. 2023</td>
        </tr>
        <tr>
            <th scope="row">3</th>
            <td>THE MARVELS </td>
            <td>Glor Medin</td>
            <td>27 JUL. 2023</td>
        </tr>
    </tbody>
</table>
</section>)


}