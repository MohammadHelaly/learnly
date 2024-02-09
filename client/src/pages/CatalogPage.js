import React, { useState, useEffect } from "react";
import AnimatedPage from "./AnimatedPage";
import Footer from "../components/Footer/Footer";
import CatalogSection from "../components/CatalogPage/CatalogSection";

const CatalogPage = () => {
	return (
		<AnimatedPage>
			<CatalogSection />
			<Footer />
		</AnimatedPage>
	);
};

export default CatalogPage;
