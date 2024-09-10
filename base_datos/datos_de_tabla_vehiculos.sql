USE [VEHICULOS]
GO
SET IDENTITY_INSERT [dbo].[Vehiculos] ON 
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (1, N'Carro', N'Chevrolet', N'Camaro', 2024, N'Amarillo', CAST(100000.00 AS Decimal(10, 2)), N'images/carros/camaroAmarillo.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (2, N'Carro', N' Bugatti Automobiles S.A.S. ', N'Bugatti Chiron ', 2025, N'gris Azulado', CAST(55000.00 AS Decimal(10, 2)), N'images/carros/Bugatti-Chiron.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (3, N'Carro', N'General Motors', N'Hummer', 2025, N'Negro', CAST(65000.00 AS Decimal(10, 2)), N'images/carros/hummerNegra.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (4, N'Carro', N'General Motors', N'Hummer', 2025, N'Rojo', CAST(65000.00 AS Decimal(10, 2)), N'images/carros/hummerRoja.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (5, N'Carro', N'FCA Group', N'Jeep Wrangler', 2024, N'Blanco', CAST(70000.00 AS Decimal(10, 2)), N'images/carros/jeepWrangler.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (6, N'Carro', N'FCA Group', N'Jeep Wrangler', 2024, N'Amarillo', CAST(65000.00 AS Decimal(10, 2)), N'images/carros/jeepWranglerAmarillo.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (7, N'Carro', N' Lamborghini S.p.A.', N'Lamborghini Huracan', 2025, N'Azul', CAST(100000.00 AS Decimal(10, 2)), N'images/carros/Lamborghini_Huracan.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (8, N'Carro', N' Lamborghini S.p.A.', N'Lamborghini Huracan', 2025, N'Verde', CAST(100000.00 AS Decimal(10, 2)), N'images/carros/lamborghiniVerde.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (9, N'Motos', N' Ducati', N'Ducati Panigale', 2023, N'Verde', CAST(60000.00 AS Decimal(10, 2)), N'images/motos/ducatiPanigaleVerde.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (10, N'Motos', N' Ducati', N'Ducati Panigale', 2024, N'Rojo', CAST(50000.00 AS Decimal(10, 2)), N'images/motos/ducatiRoja.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (11, N'Motos', N' Yamaha', N'Mt-15', 2025, N'Azul', CAST(6000.00 AS Decimal(10, 2)), N'images/motos/mt15_Azul.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (12, N'Motos', N' Yamaha', N'Mt-15', 2025, N'Azul Claro', CAST(6000.00 AS Decimal(10, 2)), N'images/motos/mt15_AzulClaro.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (13, N'Motos', N' Yamaha', N'Mt-15', 2025, N'Negro', CAST(6000.00 AS Decimal(10, 2)), N'images/motos/mt15_negro.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (14, N'Motos', N' Yamaha', N'R6', 2025, N'Morado', CAST(40000.00 AS Decimal(10, 2)), N'images/motos/yamahaR6_Azul.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (15, N'Motos', N' Yamaha', N'R1', 2025, N'Amarillo', CAST(50000.00 AS Decimal(10, 2)), N'images/motos/yamahaYzf_R1_Amarilla.png')
GO
INSERT [dbo].[Vehiculos] ([id], [tipo], [marca], [modelo], [año], [color], [precio], [imagen_url]) VALUES (16, N'Motos', N' Yamaha', N'R1', 2025, N'Negro', CAST(50000.00 AS Decimal(10, 2)), N'images/motos/yamahaYzf_R1_Negra.png')
GO
SET IDENTITY_INSERT [dbo].[Vehiculos] OFF
GO
