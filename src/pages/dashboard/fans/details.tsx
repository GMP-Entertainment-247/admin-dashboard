import { Modal } from "../../../components/Modal";
import Button from "../../../components/shared/Button";
import Table from "../../../components/Table";
import UserDetails from "../../../shared_pages/UserDetails";
import { dataRows } from "../../../utils/constant";
import { imageProp } from "../../../utils/helpers";
import { useSingleState } from "../../../utils/hooks/useSingleState";


export default function FanDetails () {
    const showModal = useSingleState(false)

    return (
        <UserDetails />
    )
}