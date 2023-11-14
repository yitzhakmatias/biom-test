import Image from 'next/image'
import styles from './page.module.css'
import BiomTable from "@/app/components/BiomTable";

export default function Home() {

    return (
        <main className={styles.main}>
                <BiomTable/>
        </main>
    )
}
