USE [Library]
GO
/****** Object:  User [erfan]    Script Date: 5/24/2024 3:14:34 PM ******/
CREATE USER [erfan] FOR LOGIN [erfan] WITH DEFAULT_SCHEMA=[dbo]
GO
ALTER ROLE [db_owner] ADD MEMBER [erfan]
GO
/****** Object:  UserDefinedFunction [dbo].[CalculateFine]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[CalculateFine](
	@returnDate Date ,
	@dueDate Date
)
RETURNS INT
AS 
BEGIN
	DECLARE @fine INT;

	DECLARE @daysLate INT = DATEDIFF(DAY, @dueDate,@returnDate);

	SET @fine = CASE
        WHEN @daysLate <= 0 THEN 0  -- No fine if returned on or before due date
        ELSE @daysLate * 1000  -- 1000Toman fine per day for each day late
    END;

	RETURN @fine;
END;
GO
/****** Object:  Table [dbo].[Book]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[categoryID] [int] NOT NULL,
	[Title] [nvarchar](50) NOT NULL,
	[Author] [nvarchar](50) NOT NULL,
	[ISBN] [nvarchar](13) NOT NULL,
	[Description] [ntext] NULL,
	[price] [int] NOT NULL,
	[stock] [int] NOT NULL,
	[EmpId] [int] NULL,
 CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  View [dbo].[view1]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[view1] as (
	select * 
	from Book
	where stock < 5
)
GO
/****** Object:  Table [dbo].[Member]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Member](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Fname] [nvarchar](50) NOT NULL,
	[Lname] [nvarchar](50) NOT NULL,
	[Address] [nvarchar](200) NULL,
	[Email] [nvarchar](50) NULL,
	[PhoneNumber] [nvarchar](11) NOT NULL,
 CONSTRAINT [PK_Member] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Loan]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Loan](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[BookId] [int] NOT NULL,
	[MemberId] [int] NOT NULL,
	[lendingDate] [date] NOT NULL,
	[ReturnDate] [date] NULL,
	[EmpId] [int] NOT NULL,
 CONSTRAINT [PK_Loan] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  View [dbo].[BorrowedBooksView]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[BorrowedBooksView] AS(
	SELECT m.Fname , m.Lname , m.PhoneNumber , b.Title , l.lendingDate , l.ReturnDate 
	FROM dbo.Loan as l
	join dbo.Member as m on l.MemberId = m.ID
	join dbo.Book as b on l.BookId = b.ID
)
GO
/****** Object:  View [dbo].[b]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE VIEW [dbo].[b] as(
	select * from Book where price > 40000
)
GO
/****** Object:  Table [dbo].[address_member]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[address_member](
	[MemID] [int] NOT NULL,
	[ADDRESS_MEM] [varchar](255) NOT NULL,
 CONSTRAINT [PK_address_member] PRIMARY KEY CLUSTERED 
(
	[MemID] ASC,
	[ADDRESS_MEM] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Culture]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Culture](
	[BookID] [int] NOT NULL,
	[subject] [nvarchar](50) NULL,
 CONSTRAINT [PK_Culture] PRIMARY KEY CLUSTERED 
(
	[BookID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employee]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employee](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[Post] [nvarchar](50) NOT NULL,
	[Start_work] [date] NOT NULL,
 CONSTRAINT [PK_Employee] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Librarians]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Librarians](
	[EmpID] [int] NOT NULL,
	[Specialization] [nvarchar](50) NULL,
 CONSTRAINT [PK_Librarians] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Manager]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Manager](
	[EmpID] [int] NOT NULL,
	[Respansibility] [nvarchar](50) NULL,
 CONSTRAINT [PK_Manager] PRIMARY KEY CLUSTERED 
(
	[EmpID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Professional]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Professional](
	[BookID] [int] NOT NULL,
	[Field] [nvarchar](50) NULL,
 CONSTRAINT [PK_Professional] PRIMARY KEY CLUSTERED 
(
	[BookID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publisher]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publisher](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](50) NOT NULL,
	[PhoneNumber] [nvarchar](11) NOT NULL,
 CONSTRAINT [PK_Publisher] PRIMARY KEY CLUSTERED 
(
	[ID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Publisher_book]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Publisher_book](
	[ID] [int] IDENTITY(1,1) NOT NULL,
	[PublisherId] [int] NOT NULL,
	[BookID] [int] NOT NULL,
 CONSTRAINT [PK_Publisher_book] PRIMARY KEY CLUSTERED 
(
	[PublisherId] ASC,
	[BookID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Story]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Story](
	[BookID] [int] NOT NULL,
	[Genre] [nvarchar](50) NULL,
 CONSTRAINT [PK_Story] PRIMARY KEY CLUSTERED 
(
	[BookID] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[address_member] ([MemID], [ADDRESS_MEM]) VALUES (8, N'Karaj Golshahr')
INSERT [dbo].[address_member] ([MemID], [ADDRESS_MEM]) VALUES (11, N'Karaj Golshahr')
GO
SET IDENTITY_INSERT [dbo].[Book] ON 

INSERT [dbo].[Book] ([ID], [categoryID], [Title], [Author], [ISBN], [Description], [price], [stock], [EmpId]) VALUES (1, 1, N'Math', N'Mohammadi', N'1234567890123', NULL, 40000, 2, 2)
INSERT [dbo].[Book] ([ID], [categoryID], [Title], [Author], [ISBN], [Description], [price], [stock], [EmpId]) VALUES (2, 2, N'Fiction', N'Ajorlu', N'1234567890987', N'', 100000, 20, 2)
INSERT [dbo].[Book] ([ID], [categoryID], [Title], [Author], [ISBN], [Description], [price], [stock], [EmpId]) VALUES (3, 2, N'biography', N'salehpour', N'1234567890786', N'tset', 50000, 18, 2)
INSERT [dbo].[Book] ([ID], [categoryID], [Title], [Author], [ISBN], [Description], [price], [stock], [EmpId]) VALUES (4, 3, N'Poem', N'Zangane', N'1345625673564', NULL, 200000, 0, 2)
INSERT [dbo].[Book] ([ID], [categoryID], [Title], [Author], [ISBN], [Description], [price], [stock], [EmpId]) VALUES (5, 3, N'Programming', N'Ajorlu', N'1345625673562', N'A detailed book on programming.', 140000, 19, 1)
INSERT [dbo].[Book] ([ID], [categoryID], [Title], [Author], [ISBN], [Description], [price], [stock], [EmpId]) VALUES (9, 1, N'science', N'erfan', N'1234567890786', NULL, 10000, 1, 1)
SET IDENTITY_INSERT [dbo].[Book] OFF
GO
INSERT [dbo].[Culture] ([BookID], [subject]) VALUES (5, N'program')
GO
SET IDENTITY_INSERT [dbo].[Employee] ON 

INSERT [dbo].[Employee] ([ID], [Name], [Post], [Start_work]) VALUES (1, N'Mohamadi', N'manger', CAST(N'2020-12-01' AS Date))
INSERT [dbo].[Employee] ([ID], [Name], [Post], [Start_work]) VALUES (2, N'Ajorlu', N'librarian', CAST(N'2020-12-19' AS Date))
INSERT [dbo].[Employee] ([ID], [Name], [Post], [Start_work]) VALUES (3, N'Arezi', N'librarian', CAST(N'2021-03-01' AS Date))
INSERT [dbo].[Employee] ([ID], [Name], [Post], [Start_work]) VALUES (9, N'Babai', N'librarian	', CAST(N'2022-10-08' AS Date))
INSERT [dbo].[Employee] ([ID], [Name], [Post], [Start_work]) VALUES (17, N'Gashtil', N'librarian', CAST(N'2022-02-23' AS Date))
SET IDENTITY_INSERT [dbo].[Employee] OFF
GO
INSERT [dbo].[Librarians] ([EmpID], [Specialization]) VALUES (17, NULL)
GO
SET IDENTITY_INSERT [dbo].[Loan] ON 

INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (1, 1, 1, CAST(N'2024-04-27' AS Date), CAST(N'2024-04-29' AS Date), 2)
INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (3, 4, 1, CAST(N'2024-04-28' AS Date), CAST(N'2024-05-18' AS Date), 2)
INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (4, 2, 1, CAST(N'2023-12-12' AS Date), NULL, 2)
INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (5, 2, 1, CAST(N'2024-02-02' AS Date), NULL, 1)
INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (6, 1, 1, CAST(N'2024-02-02' AS Date), NULL, 1)
INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (7, 3, 1, CAST(N'2024-02-02' AS Date), NULL, 1)
INSERT [dbo].[Loan] ([ID], [BookId], [MemberId], [lendingDate], [ReturnDate], [EmpId]) VALUES (8, 4, 2, CAST(N'2024-02-02' AS Date), NULL, 2)
SET IDENTITY_INSERT [dbo].[Loan] OFF
GO
INSERT [dbo].[Manager] ([EmpID], [Respansibility]) VALUES (1, NULL)
GO
SET IDENTITY_INSERT [dbo].[Member] ON 

INSERT [dbo].[Member] ([ID], [Fname], [Lname], [Address], [Email], [PhoneNumber]) VALUES (1, N'Erfan', N'Ajorlou', NULL, N'erfanajoglu098@gmail.com', N'09138295366')
INSERT [dbo].[Member] ([ID], [Fname], [Lname], [Address], [Email], [PhoneNumber]) VALUES (2, N'Tina', N'Mohammadi', NULL, NULL, N'09901905912')
INSERT [dbo].[Member] ([ID], [Fname], [Lname], [Address], [Email], [PhoneNumber]) VALUES (5, N'Atena', N'Ajorlu', NULL, NULL, N'09916108072')
INSERT [dbo].[Member] ([ID], [Fname], [Lname], [Address], [Email], [PhoneNumber]) VALUES (8, N'Arash', N'Ghasemnejad', NULL, NULL, N'09123284726')
INSERT [dbo].[Member] ([ID], [Fname], [Lname], [Address], [Email], [PhoneNumber]) VALUES (11, N'Hamid', N'Ghasemnejad', NULL, NULL, N'09138295398')
SET IDENTITY_INSERT [dbo].[Member] OFF
GO
INSERT [dbo].[Professional] ([BookID], [Field]) VALUES (9, N'Tajrobi')
GO
SET IDENTITY_INSERT [dbo].[Publisher] ON 

INSERT [dbo].[Publisher] ([ID], [Name], [PhoneNumber]) VALUES (1, N'mahak', N'02634569400')
INSERT [dbo].[Publisher] ([ID], [Name], [PhoneNumber]) VALUES (2, N'milkan', N'02112345687')
INSERT [dbo].[Publisher] ([ID], [Name], [PhoneNumber]) VALUES (3, N'ghalamchi', N'01234567890')
INSERT [dbo].[Publisher] ([ID], [Name], [PhoneNumber]) VALUES (4, N'gaj', N'12345678901')
INSERT [dbo].[Publisher] ([ID], [Name], [PhoneNumber]) VALUES (5, N'Rastin', N'03174937285')
INSERT [dbo].[Publisher] ([ID], [Name], [PhoneNumber]) VALUES (7, N'Poyan', N'02173842933')
SET IDENTITY_INSERT [dbo].[Publisher] OFF
GO
SET IDENTITY_INSERT [dbo].[Publisher_book] ON 

INSERT [dbo].[Publisher_book] ([ID], [PublisherId], [BookID]) VALUES (1, 1, 1)
INSERT [dbo].[Publisher_book] ([ID], [PublisherId], [BookID]) VALUES (2, 1, 9)
INSERT [dbo].[Publisher_book] ([ID], [PublisherId], [BookID]) VALUES (4, 2, 5)
INSERT [dbo].[Publisher_book] ([ID], [PublisherId], [BookID]) VALUES (10, 4, 4)
SET IDENTITY_INSERT [dbo].[Publisher_book] OFF
GO
INSERT [dbo].[Story] ([BookID], [Genre]) VALUES (2, N'ترسناک')
GO
ALTER TABLE [dbo].[address_member]  WITH CHECK ADD  CONSTRAINT [FK__address_m__MemID__151B244E] FOREIGN KEY([MemID])
REFERENCES [dbo].[Member] ([ID])
GO
ALTER TABLE [dbo].[address_member] CHECK CONSTRAINT [FK__address_m__MemID__151B244E]
GO
ALTER TABLE [dbo].[address_member]  WITH CHECK ADD FOREIGN KEY([MemID])
REFERENCES [dbo].[Member] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Book]  WITH CHECK ADD  CONSTRAINT [FK__Book__EmpId__6C190EBB] FOREIGN KEY([EmpId])
REFERENCES [dbo].[Employee] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Book] CHECK CONSTRAINT [FK__Book__EmpId__6C190EBB]
GO
ALTER TABLE [dbo].[Book]  WITH CHECK ADD  CONSTRAINT [FK_Book_Book] FOREIGN KEY([ID])
REFERENCES [dbo].[Book] ([ID])
GO
ALTER TABLE [dbo].[Book] CHECK CONSTRAINT [FK_Book_Book]
GO
ALTER TABLE [dbo].[Book]  WITH CHECK ADD  CONSTRAINT [FK_Book_Book1] FOREIGN KEY([ID])
REFERENCES [dbo].[Book] ([ID])
GO
ALTER TABLE [dbo].[Book] CHECK CONSTRAINT [FK_Book_Book1]
GO
ALTER TABLE [dbo].[Culture]  WITH CHECK ADD  CONSTRAINT [FK_Culture_Book] FOREIGN KEY([BookID])
REFERENCES [dbo].[Book] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Culture] CHECK CONSTRAINT [FK_Culture_Book]
GO
ALTER TABLE [dbo].[Librarians]  WITH CHECK ADD  CONSTRAINT [FK_EmpID] FOREIGN KEY([EmpID])
REFERENCES [dbo].[Employee] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Librarians] CHECK CONSTRAINT [FK_EmpID]
GO
ALTER TABLE [dbo].[Loan]  WITH CHECK ADD  CONSTRAINT [FK__Loan__EmpId__797309D9] FOREIGN KEY([EmpId])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[Loan] CHECK CONSTRAINT [FK__Loan__EmpId__797309D9]
GO
ALTER TABLE [dbo].[Loan]  WITH CHECK ADD  CONSTRAINT [FK_Loan_Book] FOREIGN KEY([BookId])
REFERENCES [dbo].[Book] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Loan] CHECK CONSTRAINT [FK_Loan_Book]
GO
ALTER TABLE [dbo].[Loan]  WITH CHECK ADD  CONSTRAINT [FK_Loan_Member] FOREIGN KEY([MemberId])
REFERENCES [dbo].[Member] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Loan] CHECK CONSTRAINT [FK_Loan_Member]
GO
ALTER TABLE [dbo].[Manager]  WITH CHECK ADD  CONSTRAINT [FK_EmpIDManager] FOREIGN KEY([EmpID])
REFERENCES [dbo].[Employee] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Manager] CHECK CONSTRAINT [FK_EmpIDManager]
GO
ALTER TABLE [dbo].[Manager]  WITH CHECK ADD  CONSTRAINT [FK_EmpoyeeID] FOREIGN KEY([EmpID])
REFERENCES [dbo].[Employee] ([ID])
GO
ALTER TABLE [dbo].[Manager] CHECK CONSTRAINT [FK_EmpoyeeID]
GO
ALTER TABLE [dbo].[Professional]  WITH CHECK ADD  CONSTRAINT [FK_Professional_Book] FOREIGN KEY([BookID])
REFERENCES [dbo].[Book] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Professional] CHECK CONSTRAINT [FK_Professional_Book]
GO
ALTER TABLE [dbo].[Publisher_book]  WITH CHECK ADD  CONSTRAINT [FK_BookID] FOREIGN KEY([BookID])
REFERENCES [dbo].[Book] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Publisher_book] CHECK CONSTRAINT [FK_BookID]
GO
ALTER TABLE [dbo].[Publisher_book]  WITH CHECK ADD  CONSTRAINT [FK_PublisherId] FOREIGN KEY([PublisherId])
REFERENCES [dbo].[Publisher] ([ID])
GO
ALTER TABLE [dbo].[Publisher_book] CHECK CONSTRAINT [FK_PublisherId]
GO
ALTER TABLE [dbo].[Story]  WITH CHECK ADD  CONSTRAINT [FK_Story_Book] FOREIGN KEY([BookID])
REFERENCES [dbo].[Book] ([ID])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Story] CHECK CONSTRAINT [FK_Story_Book]
GO
/****** Object:  StoredProcedure [dbo].[AddBook]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[AddBook]
    @ID INT,
    @CategoryID INT,
    @Title NVARCHAR(50),
    @Author NVARCHAR(50),
    @ISBN NVARCHAR(13),
    @Description NVARCHAR(MAX) = NULL,
    @Price INT,
    @Stock INT,
    @PublisherId INT,
    @EmpId INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Insert the book into the Book table
    INSERT INTO Book (ID, CategoryID, Title, Author, ISBN, Description, Price, Stock, PublisherId, EmpId)
    VALUES (@ID, @CategoryID, @Title, @Author, @ISBN, @Description, @Price, @Stock, @PublisherId, @EmpId);
END;
GO
/****** Object:  StoredProcedure [dbo].[lendBookToUser]    Script Date: 5/24/2024 3:14:34 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[lendBookToUser](
    @userID INT,
    @bookID INT,
	@EmpId INT,
    @loanDate DATE
)
AS
BEGIN
    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM Member WHERE ID = @userID)
    BEGIN
        RETURN 'Error: User does not exist.'
    END

	IF NOT EXISTS (SELECT 1 FROM Employee WHERE ID = @EmpId)
    BEGIN
        RETURN 'Error: Employee does not exist.'
    END

    -- Check if the book exists
    IF NOT EXISTS (SELECT 1 FROM Book WHERE ID = @bookID)
    BEGIN
        RETURN 'Error: Book does not exist.'
    END

	IF EXISTS(SELECT 1 FROM BOOK WHERE ID = @bookID AND stock <= 0)
	BEGIN
		RETURN 'Error: Book is out of stock.'
	END

    -- Update the Load table to reflect the lending operation
    INSERT INTO Loan (MemberId, BookID, lendingDate , ReturnDate , EmpId)
    VALUES (@userID, @bookID, @loanDate , null , @EmpId)

    -- Reduce the number of books in the library inventory
    UPDATE Book
    SET stock = stock - 1
    WHERE ID = @bookID 

    RETURN 'Book successfully lent to user.'
END
GO
