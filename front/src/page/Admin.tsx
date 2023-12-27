import {AdminAbout, AdminServices} from "../section";

const Admin = () => {
    return (
        <div>
            <section className="bg-bg-main pt-20">
                <AdminServices/>
            </section>
            <section className="bg-main-dark pt-20">
                <AdminAbout/>
            </section>
        </div>
    )
}

export default Admin