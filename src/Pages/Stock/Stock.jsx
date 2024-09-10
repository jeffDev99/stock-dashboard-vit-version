import { React, useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
import Select from "@mui/material/Select";
import Pagination from "@mui/material/Pagination";

import { FaEye } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";

import Swal from "sweetalert2";
import "./Stock.css";

export default function Stock() {
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [showBy, setShowBy] = useState("");
  // const [catBy, setCatBy] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fani.khz-fanoos.ir/api/Stock/get-stocks");
        const data = await response.json();
        setStock(data);
      } catch (e) {
        console.log(e);
      }
    };

    fetchData();
  }, []);
  const showHandler = (stockId) => {
    const findedStock = stock.find((stock) => stock.id === stockId);
    if (findedStock.goods.length) {
      Swal.fire({
        title: "The Internet?",
        html: `${findedStock.goods.map((good) => <p>${good.name}</p>)}`,
      });
      findedStock.goods.map((good) => console.log(good.name));
    }
  };
  return (
    <div>
      <div className="card shadow border-0 p-3">
        <div className="row card-filters">
          <h4 className="card__title">لیست انبارها</h4>
        </div>
        <div className="table-responsive mt-3">
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ردیف</th>
                <th>نام انبار</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {stock.length
                ? stock.map((stockItem, index) => (
                    <tr key={stockItem.id}>
                      <td>{index + 1}</td>
                      <td>{stockItem.stockName}</td>
                      <td>
                        <div className="table-actions d-flex align-items-center">
                          <Button onClick={() => showHandler(stockItem.id)} color="secondary" variant="contained" startIcon={<FaEye />} className="table-actions__btn">
                            کالا
                          </Button>
                          <Button color="success" variant="contained" startIcon={<FaPencil />} className="table-actions__btn">
                            ویرایش
                          </Button>
                          <Button color="error" variant="contained" startIcon={<MdDelete />} className="table-actions__btn">
                            حذف
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                : "هنوز انباری تعریف نشده"}
            </tbody>
          </table>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <Pagination count={10} color="primary" showFirstButton showLastButton />
          <p className="m-0">
            نمایش <b>12</b> از <b>60</b> نتیجه
          </p>
        </div>
      </div>
    </div>
  );
}
