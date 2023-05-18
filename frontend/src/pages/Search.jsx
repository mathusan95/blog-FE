import useDebounce from "@/hooks/useDebounce.js";
import { Input, Spin } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { render } from "react-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Highlighter from "react-highlight-words";
import "../../src/SCSS-Styles/style.css";

const style = {
  height: "auto",
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const App = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const debouncedSearchTerm = useDebounce(search, 500);
  const [language, setLanguage] = useState("en");

  // componentDidMount() {
  //   this.fetchMoreData()
  // }
  useEffect(() => {
    fetchMoreData(items, 1, search);
  }, []);

  useEffect(() => {
    fetchMoreData([], 1, debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const fetchMoreData = (data = items, pages = page, searchValue = search) => {
    setLoading(true);

    axios
      .get(
        "https://7fp45p0wyg.execute-api.us-east-2.amazonaws.com/dev/search/posts",
        {
          params: {
            page: pages,
            limit,
            searchString: encodeURI(searchValue || ""),
          },
        }
      )
      .then((result) => {
        setLoading(false);
        setItems(data.concat(result.data.data.data));
        if (search.trim().length) {
          data.concat(result.data.data.data).forEach((data) => {
            for (const heading of data.headings) {
              const strings = search.trim().split(" ");
              for (const singleLetter of strings) {
                if (heading.value.includes(singleLetter)) {
                  setLanguage(heading.system_language);
                }
              }
            }
          });
        }
        setPage(pages);
        if (result.data.data.totalCount <= pages * limit) {
          setHasMore(false);
        }
      });
  };

  return (
    <div id="scrollableDiv" style={{ height: "700px" }}>
      {console.log(search, "search")}
      <Input
        placeholder="Basic usage"
        onChange={(e) => {
          setSearch(e.target.value);
          setHasMore(true);
        }}
      />{" "}
      <hr />
      <div class="container">
        <InfiniteScroll
          dataLength={items.length}
          next={() => fetchMoreData(items, page + 1, search)}
          hasMore={hasMore}
          loader={<Spin />}
          scrollableTarget="scrollableDiv"
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          {items.length > 0 &&
            items.map((i, index) => (
              <div class="card">
                <div class="face face1">
                  <div class="content">
                    <img src="https://github.com/Jhonierpc/WebDevelopment/blob/master/CSS%20Card%20Hover%20Effects/img/design_128.png?raw=true" />
                    <h3>Design</h3>
                  </div>
                </div>
                <div class="face face2">
                  <div class="content">
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quas cum cumque minus iste veritatis provident at.
                    </p>
                    <a href="#">Read More</a>
                  </div>
                </div>
                {i?.headings
                  ?.filter((data) => data.system_language === language)
                  .map((val) => (
                    <ul>
                      <Highlighter
                        highlightClassName="YourHighlightClass"
                        searchWords={search.trim().split(" ")}
                        autoEscape={true}
                        textToHighlight={val.value}
                      />
                    </ul>
                  ))}
              </div>
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default App;
